<?php

namespace Main\CommonBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/fake');

        $this->assertTrue($crawler->filter('html:contains("nothing")')->count() > 0);
    }
}
