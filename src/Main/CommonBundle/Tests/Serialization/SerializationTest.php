<?php
namespace Main\CommonBundle\Tests\Serialization;

use Main\CommonBundle\Entity\User;
use \Mockery as m;
use Main\CommonBundle\Entity\Points;

/**
 * Class SerializationTest
 * @package Main\CommonBundle\Tests\Serialization
 */
class SerializationTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @desc Test if Point Entity return json
     */
    public function testPointsSerialization()
    {
        $points = new Points();
        $points->setUser(new User());
        $points->setDate(new \DateTime());
        $this->assertArrayHasKey('id', $points->jsonSerialize());
    }

}