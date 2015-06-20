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
    const LIMIT = 999;
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
        $this->redis->flushdb();
        for ($i = 1; $i <= self::LIMIT; $i++) {
            $this->addToPostgres($userManager, $i);
            $this->addToRedis($i);
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

            $profile->setCoordinateX((rand(1, 999)));
            $profile->setCoordinateY((rand(1, 999)));
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
     * @param $i
     */
    private function addToRedis($i)
    {
        $key_amount = "user_" . $i . ":soldier:amount";
        $key_interval = "user_" . $i . ":soldier:interval";
        $lua = <<<LUA
redis.call('HMSET', KEYS[1], 'Sergeant', 10)
redis.call('HMSET', KEYS[1], 'Warrant_Officer', 10)
redis.call('HMSET', KEYS[1], 'Private', 10)
redis.call('HMSET', KEYS[1], 'Corporal', 10)
redis.call('HMSET', KEYS[2], 'Sergeant', 10)
redis.call('HMSET', KEYS[2], 'Warrant_Officer', 10)
redis.call('HMSET', KEYS[2], 'Private', 10)
redis.call('HMSET', KEYS[2], 'Corporal', 10)
LUA;

        $this->redis->eval($lua, 2, $key_amount, $key_interval);
    }
}