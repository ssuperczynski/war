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
        $rand = rand(20, 70);
        $randNr = rand(1, 100000000);

        for ($i = 0; $i < $rand; $i++) {
            sleep(1);
//            echo $msg->body . PHP_EOL;

            $this->redis->rpush('friends', $randNr.'-'.$msg->body);
        }

    }
}
