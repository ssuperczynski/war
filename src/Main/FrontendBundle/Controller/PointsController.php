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
        $points = $this->getDoctrine()->getManager()
            ->getRepository('MainCommonBundle:Points')
            ->findOneBy(
                [
                    'id' => $this->getUser()->getId()
                ]
            );

        return new JsonResponse($points);
    }
}
