<?php

namespace Main\CommonBundle\Services;

use Doctrine\ORM\EntityManager;
use Predis\Client;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class PointsService
 * @package Main\CommonBundle\Services
 */
class PointsService
{
    /**
     * @var Client $redis
     */
    private $redis;


    /**
     * @param Client $redis
     * @param Container $container
     */
    function __construct(Client $redis, Container $container)
    {
        $this->redis = $redis;
        $this->container = $container;
    }

    /**
     * @param int $user
     * @return string
     */
    public function getAmount($user)
    {
        return [
            'points' => $this->redis->hgetall("user_" . $user . ":counter"),
            'messages' => $this->redis->lrange("user_" . $user . ":messages", 0, 100)
        ];
    }
}
