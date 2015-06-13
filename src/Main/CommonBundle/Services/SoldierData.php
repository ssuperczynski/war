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
        $points = [];
        $soldiers = [
            'Private',
            'Corporal',
            'Sergeant',
            'Warrant_Officer'
        ];
        foreach ($soldiers as $soldier) {
            $points[$soldier]['soldiers'] = (int) $this->redis->hget("user_".$user.":soldier:amount", $soldier);
        }

        return $points;
    }
}
