<?php

namespace Main\CommonBundle\Services;

use Doctrine\ORM\EntityManager;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use Predis\Client;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class ReadNode
 * @package Main\CommonBundle\Services
 */
class ReadNode implements ConsumerInterface
{
    /**
     * @var Client $redis
     */
    private $redis;

    /**
     * @param EntityManager $em
     * @param Client        $redis
     * @param Container     $container
     */
    function __construct(EntityManager $em, Client $redis, Container $container)
    {
        $this->em = $em;
        $this->redis = $redis;
        $this->container = $container;
    }

    /**
     *
    core of the couter
    1. from frontentd (angular) you can click many times button which adding soldiers to queue
    2. it adds to queue (this script)
    3. symfony2 command works all the time with 1 sec interval
    4. when you adding something to this queue save:
    - added time (if key exists leave old time, if not add new one)
    - incremented amount
    - what (range)
    - user (as a key)
    5. symfony2 command every second checks queues KEYS and calculate now time minus added time
    6. if (diff % soldier_interval) == 0, add soldier to trained queue
    6a. else wait second
    7. consumer when runs increment solderis queue, decr this queue
    8. consumer iterate each second through all hashkeys
     * @param AMQPMessage $msg
     * @return mixed
     */
    public function execute(AMQPMessage $msg)
    {
        $json = json_decode($msg->body);
        $key_amount = 'user_' . $json->user . ':soldier:queue_amount';
        $key_time   = 'user_' . $json->user . ':soldier:queue_time';
        $lua = <<<LUA
local incr_by = redis.call("HINCRBY", KEYS[1],  ARGV[3], ARGV[1])
local time_exists = redis.call("HEXISTS", KEYS[2], ARGV[3])
if time_exists == 1 then
    return redis.call('HMSET', KEYS[1], ARGV[3], incr_by)
else
    redis.call('HMSET', KEYS[1], ARGV[3], incr_by)
    return redis.call('HMSET', KEYS[2], ARGV[3], ARGV[2])
end
LUA;

        $this->redis->eval($lua, 2, $key_amount, $key_time, $json->amount, (new \DateTime())->format('Y-m-d H:i:s'), $json->range);
    }
}
