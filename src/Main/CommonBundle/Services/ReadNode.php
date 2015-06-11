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
     * @param AMQPMessage $msg
     * @return mixed
     */
    public function execute(AMQPMessage $msg)
    {
        $json = json_decode($msg->body);
        $key = 'user:' . $json->user . ':' . $json->range;
        $lua = <<<LUA
            return redis.call('hmset', KEYS[1], 'amount', ARGV[1], 'time', ARGV[2])
LUA;

        $this->redis->eval($lua, 1, $key, 1, (new \DateTime())->format('Y-m-d H:i:s'));
    }
}
