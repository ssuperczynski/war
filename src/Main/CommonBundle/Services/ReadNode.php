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
     * @param Client $redis
     * @param Container $container
     */
    function __construct(EntityManager $em, Client $redis, Container $container)
    {
        $this->em = $em;
        $this->redis = $redis;
        $this->container = $container;
    }

    /**
     * @param AMQPMessage $msg
     */
    public function execute(AMQPMessage $msg)
    {
        $firebase = $this->container->get('kreait_firebase.connection.main');

        $json = json_decode($msg->body);
        for ($i = 1; $i <= $json->amount; $i++) {
            sleep($json->time / $json->amount);
            $this->redis->hincrby($json->user, $json->range, 1);
            $currentAmount = $this->redis->hget($json->user, $json->range);
            $firebase->update([$json->range => $currentAmount], 'data/users/'.$json->user);
        }

    }
}
