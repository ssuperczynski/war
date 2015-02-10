<?php

namespace Main\FrontendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Main\CommonBundle\Entity\Points;

class LoadPointsData implements FixtureInterface, OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        for ($i = 1; $i <= 3; $i++) {
            $points = new Points();
            $points->setDate(new \DateTime());
            $points->setUserId($i);
            $points->setConcrete(100);
            $points->setSoldier(10);
            $points->setFood(100);
            $points->setIron(10);

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
}