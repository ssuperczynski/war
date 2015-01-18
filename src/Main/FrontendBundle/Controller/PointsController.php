<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class PointsController
 * @package Main\FrontendBundle\Controller
 */
class PointsController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function getAction()
    {
//        $user = $this->getUser();
        $points = $this->getDoctrine()->getManager()
            ->getRepository('MainFrontendBundle:Points')
            ->findOneBy(['id' => 6]);

        return new JsonResponse($points);
    }
}