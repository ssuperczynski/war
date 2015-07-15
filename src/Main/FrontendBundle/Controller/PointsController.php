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
        $points = $this->get('points_service')->getAmount($this->getUser()->getId());

        return new JsonResponse($points);
    }
}
