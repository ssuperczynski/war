<?php

namespace Main\FrontendBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * Class EndpointTest
 * @package Main\FrontendBundle\Tests\Controller
 */
class EndpointTest extends WebTestCase
{

    /**
     * @param $url
     * @dataProvider urlProvider
     */
    public function testFrontend($routing)
    {
        $client = static::createClient(array(), array(
            'PHP_AUTH_USER' => 'user1',
            'PHP_AUTH_PW'   => 'test',
        ));
        $url = $client->getContainer()->get('router')->generate($routing);
        $client->request('GET', $url);

        $this->assertTrue($client->getResponse()->isSuccessful());
    }

    /**
     * @return array
     */
    public function urlProvider()
    {
        return array(
            array('frontend.view.homepage'),
            array('frontend.view.map'),
            array('frontend.view.vehicles'),
            array('frontend.view.soldiers'),
        );
    }

    public function testSoldiersAPI()
    {
//        $client = static::createClient(array(), array(
//            'PHP_AUTH_USER' => 'user1',
//            'PHP_AUTH_PW'   => 'test',
//        ));
//        $client->request('GET', '/soldiers/data');
//
//        $response = $client->getResponse();
//        $this->assertSame(200, $client->getResponse()->getStatusCode()); // Test if response is OK
//        $this->assertSame('application/json', $response->headers->get('Content-Type')); // Test if Content-Type is valid application/json
//        $this->assertNotEmpty($client->getResponse()->getContent()); // Test that response is not empty
    }
}
