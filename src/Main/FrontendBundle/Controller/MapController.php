<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
}
