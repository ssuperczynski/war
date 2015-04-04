<?php

namespace Main\FrontendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Main\CommonBundle\Entity\Points;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class LoadPointsData
 * @package Main\FrontendBundle\DataFixtures\ORM
 */
class LoadPointsData extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface
{
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
        for ($i = 1; $i <= LoadUsersData::LIMIT; $i++) {
            $points = new Points();
            $points->setDate(new \DateTime());
            $points->setUser($this->getReference('user' . $i));
            $points->setConcrete(self::gerRandomNumber());
            $points->setSoldier(self::gerRandomNumber());
            $points->setFood(self::gerRandomNumber());
            $points->setIron(self::gerRandomNumber());

            $manager->persist($points);
        }

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 110;
    }

    /**
     * @return int
     */
    private static function gerRandomNumber()
    {
        return rand(1000, 1000000);
    }
}