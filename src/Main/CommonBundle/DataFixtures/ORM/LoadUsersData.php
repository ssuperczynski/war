<?php

namespace Main\FrontendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Main\CommonBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadUsersData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    const LIMIT = 15;
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
        $this->loadAdmin($userManager);

        $manager->flush();
    }

    private function loadUsers($userManager)
    {

        for ($i = 1; $i <= self::LIMIT; $i++) {
            /** @var User $user */
            $user = $userManager->createUser();
            $user->setUsername('user' . $i);
            $user->setEmail('user' . $i . '@war.com_test');
            $user->setPlainPassword('test');
            $user->setEnabled(true);
            $user->addRole(User::ROLE_USER);

            $this->addReference('user' . $i, $user);
            $userManager->updateUser($user);
        }
    }

    private function loadAdmin($userManager)
    {
        /** @var User $admin */
        $admin = $userManager->createUser();
        $admin->setUsername('admin');
        $admin->setEmail('admin@war.com_test');
        $admin->setPlainPassword('test');
        $admin->setEnabled(true);
        $admin->addRole(User::ROLE_ADMIN);

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