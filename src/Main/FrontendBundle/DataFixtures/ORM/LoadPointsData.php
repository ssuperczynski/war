<?php

namespace Main\FrontendBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Main\FrontendBundle\Entity\Points;

class LoadPointsData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $points = new Points();
        $points->setDate(new \DateTime());
        $points->setUserId(1);
        $points->setConcrete(100);
        $points->setSoldier(10);
        $points->setFood(10);
        $points->setMetal(0);

        $manager->persist($points);
        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 100;
    }
}