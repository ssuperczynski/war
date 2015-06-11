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
        $lua = <<<LUA
            return redis.call('hmset', 'version', '1', '2', 4, 6)
LUA;

        $this->redis->eval($lua, 0);
    }
}
