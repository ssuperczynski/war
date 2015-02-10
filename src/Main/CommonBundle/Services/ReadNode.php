<?php

namespace Main\CommonBundle\Services;

use Doctrine\ORM\EntityManager;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use Predis\Client;

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
     */
    function __construct(EntityManager $em, Client $redis)
    {
        $this->em = $em;
        $this->redis = $redis;
    }

    /**
     * @param AMQPMessage $msg
     */
    public function execute(AMQPMessage $msg)
    {
        $json = json_decode($msg->body);
        for ($i = 0; $i < $json->time; $i++) {
            sleep(1);

            $this->redis->rpush('soldiers', $json->user . '-' . $json->range);
        }

    }
}
