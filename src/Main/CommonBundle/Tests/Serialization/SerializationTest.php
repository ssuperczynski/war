<?php
namespace Main\CommonBundle\Tests\Serialization;

use Main\CommonBundle\Entity\Profile;
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

    /**
     * @desc Test if User Entity return json
     */
    public function testUserSerialization()
    {
        $user = new User();
        $user->setEmail('test@test.com');
        $user->setUsername('test');

        $this->assertArrayHasKey('id', $user->jsonSerialize());
    }

    /**
     * @desc Test if User Entity return json
     */
    public function testProfileSerialization()
    {
        $profile = new Profile();

        $this->assertArrayHasKey('id', $profile->jsonSerialize());
    }

}