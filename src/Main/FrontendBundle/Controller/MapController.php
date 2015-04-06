<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class PointsController
 * @package Main\FrontendBundle\Controller
 */
class MapController extends Controller
{

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction()
    {
        return $this->render('MainFrontendBundle:Map:show.html.twig');
    }

    public function mapUsersAction()
    {
        $coordinates = $this->getDoctrine()->getRepository('MainCommonBundle:Profile')->getUsersForMap();
        return new JsonResponse([
            'coordinates' => $coordinates
        ]);
    }
}
