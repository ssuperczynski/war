<?php

namespace Main\CommonBundle\Services;

use Doctrine\ORM\EntityManager;
use Predis\Client;
use Symfony\Component\DependencyInjection\Container;


/**
 * Class SpyService
 * @package Main\CommonBundle\Services
 */
class SpyService
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
     * @param int $user
     * @param int $spied
     * @param int $distance
     * @return string
     */
    public function startSpy($user, $spied, $distance)
    {
        try {
            $scan_nr = $this->redis->incr("user_" . $user . ":scan_amount");
            $this->redis->hmset("user_" . $user . ":scan:" . $scan_nr, "scanned", $spied);
            $this->redis->hmset("user_" . $user . ":scan:" . $scan_nr, "spy", $user);
            $this->redis->hmset("user_" . $user . ":scan:" . $scan_nr, "time", (new \DateTime())->add(new \DateInterval('PT' . $distance . 'S'))->format('Y-m-d H:i:s'));
        } catch(\RedisException $e) {
            return $e->getMessage();
        }

        return 'ok';
    }
}
