<?php

namespace Main\FrontendBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Class DefaultControllerTest
 * @package Main\FrontendBundle\Tests\Controller
 */
class DefaultControllerTest extends WebTestCase
{

    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/fakeLink');

        $this->assertTrue($crawler->filter('html:contains("Nothing")')->count() > 0);
    }
}
