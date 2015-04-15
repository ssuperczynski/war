<?php

namespace Main\FrontendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Main\CommonBundle\Entity\Profile;
use Main\CommonBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class LoadUsersData
 * @package Main\FrontendBundle\DataFixtures\ORM
 */
class LoadUsersData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    /**
     *
     */
    const LIMIT = 500;
    /**
     * @var
     */
    private $container;

    /**
     * @param ContainerInterface $container
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
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
     * @param $userManager
     */
    private function loadUsers($userManager)
    {

        for ($i = 1; $i <= self::LIMIT; $i++) {
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

            $profile->setCoordinateX(floatVal('0.'.rand(1000000000, 9999999999)));
            $profile->setCoordinateY(floatVal('0.'.rand(1000000000, 9999999999)));
            $manager->persist($profile);
        }
    }

    /**
     * @param $userManager
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
}