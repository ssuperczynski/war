<?php

namespace Main\FrontendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManager;
use Main\CommonBundle\Entity\Profile;
use Main\CommonBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Predis\Client;

/**
 * Class LoadUsersData
 * @package Main\FrontendBundle\DataFixtures\ORM
 */
class LoadUsersData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     *
     */
    const LIMIT = 99;
    /**
     * @var
     */
    private $container;

    private $redis;

    /**
     * @param ContainerInterface $container
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
        $this->redis =  new Client();
    }

    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $userManager = $this->container->get('fos_user.user_manager');
        $this->loadUsers($userManager);
        $this->loadProfiles($manager);
        $this->loadAdmin($userManager);

        $manager->flush();
    }

    /**
     * @param UserManager $userManager
     */
    private function loadUsers($userManager)
    {
        $this->addToRedis(self::LIMIT);
        for ($i = 1; $i <= self::LIMIT; $i++) {
            $this->addToPostgres($userManager, $i);
        }
    }

    /**
     * @param ObjectManager $manager
     */
    private function loadProfiles($manager)
    {

        for ($i = 1; $i <= self::LIMIT; $i++) {
            /** @var Profile $profile */
            $profile = new Profile();
            $profile->setUser($this->getReference('user'. $i));

            $profile->setCoordinateX(rand(1, 999));
            $profile->setCoordinateY(rand(1, 999));
            $manager->persist($profile);
        }
    }

    /**
     * @param UserManager $userManager
     */
    private function loadAdmin($userManager)
    {
        /** @var User $admin */
        $admin = $userManager->createUser();
        $admin
            ->setUsername('admin')
            ->setEmail('admin@war.com_test')
            ->setPlainPassword('test')
            ->setEnabled(true)
            ->addRole(User::ROLE_ADMIN);

        $userManager->updateUser($admin);
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 100;
    }

    /**
     * @param $userManager
     * @param $i
     */
    private function addToPostgres($userManager, $i)
    {
        /** @var User $user */
        $user = $userManager->createUser();
        $user
            ->setUsername('user' . $i)
            ->setEmail('user' . $i . '@war.com_test')
            ->setPlainPassword('test')
            ->setEnabled(true)
            ->addRole(User::ROLE_USER);

        $this->addReference('user' . $i, $user);
        $userManager->updateUser($user);
    }

    /**
     * @param $limit
     */
    private function addToRedis($limit)
    {
        $lua = <<<LUA
local i = tonumber(ARGV[1])
redis.call('FLUSHDB')
local ranges = { "Sergeant", "Warrant_Officer", "Private", "Corporal" }
while i > 0 do
    for k, v in pairs(ranges) do
        redis.call('HMSET' ,"user_" .. i .. ":soldier:amount", v, 10)
        redis.call('HMSET', "user_" .. i .. ":soldier:interval", v, 10)
        redis.call('HMSET', "user_" .. i .. ":soldier:speed", v, 1)
        redis.call('HMSET', "user_" .. i .. ":soldier:protection", v, 1)
        redis.call('HMSET', "user_" .. i .. ":soldier:power", v, 1)
        redis.call('HMSET', "user_" .. i .. ":soldier:queue_amount", v, 10)
        redis.call('HMSET', "user_" .. i .. ":soldier:queue_time", v, ARGV[2])
    end
    i = i - 1
end
LUA;

        $this->redis->eval($lua, 0, $limit, (new \DateTime())->format('Y-m-d H:i:s'));

        $lua2 = <<<LUA
local i = tonumber(ARGV[1])
while i > 0 do

    redis.call('HMSET' ,"user_" .. i .. ":counter", "food", ARGV[2])
    redis.call('HMSET' ,"user_" .. i .. ":counter", "soldier", ARGV[2])
    redis.call('HMSET' ,"user_" .. i .. ":counter", "iron", ARGV[2])
    redis.call('HMSET' ,"user_" .. i .. ":counter", "concrete", ARGV[2])
    redis.call('HMSET', "user_" .. i .. ":counter", "time", ARGV[3])

    i = i - 1
end
LUA;

        $this->redis->eval($lua2, 0, LoadUsersData::LIMIT, 1000, (new \DateTime())->format('Y-m-d H:i:s'));
    }
}