<?php

namespace Main\CommonBundle\Services;

use Doctrine\ORM\EntityManager;
use Predis\Client;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class ReadNode
 * @package Main\CommonBundle\Services
 */
class SoldierData
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
     * @param $user
     * @return array
     */
    public function getAmount($user)
    {
        return [
            'amount' => $this->redis->hgetall("user_" . $user . ":soldier:amount"),
            'interval' => $this->redis->hgetall("user_" . $user . ":soldier:interval"),
            'speed' => $this->redis->hgetall("user_" . $user . ":soldier:speed"),
            'protection' => $this->redis->hgetall("user_" . $user . ":soldier:protection"),
            'power' => $this->redis->hgetall("user_" . $user . ":soldier:power")
        ];
    }
}
