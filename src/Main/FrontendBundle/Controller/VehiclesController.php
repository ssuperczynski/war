<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class PointsController
 * @package Main\FrontendBundle\Controller
 */
class VehiclesController extends Controller
{

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction()
    {
        return $this->render('MainFrontendBundle:Vehicles:list.html.twig');
    }
}
