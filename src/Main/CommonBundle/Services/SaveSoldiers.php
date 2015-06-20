<?php

namespace Main\CommonBundle\Services;

use Doctrine\ORM\EntityManager;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use Predis\Client;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class SaveSoldiers
 * @package Main\CommonBundle\Services
 */
class SaveSoldiers implements ConsumerInterface
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
     * core of the counter
     * 1. from frontend (angular) you can click many times button to add soldiers
     * 2. clicks are saved in redis
     * 3. clicks are incremented
     * 4. if click exists do not add click datetime
     * 5. if clicks don't exists add first click datetime
     * 6. scala worker check every second if clicks exists
     * 7. and decrement queue every *given interval* time
     * 8. and increment given soldier amount
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
