<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class SoldiersController
 * @package Main\FrontendBundle\Controller
 */
class SoldiersController extends Controller
{

    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction()
    {
        return $this->render('MainFrontendBundle:Soldiers:list.html.twig');
    }

    public function addSoldierToQueueAction(Request $request)
    {
        $data = json_decode($request->getContent(), false);
        $this->get('soldier_queue')->process($this->getUser()->getId(), $data->time, $data->range, $data->amount);

        return new JsonResponse(Response::HTTP_OK);
    }

    /**
     * @return JsonResponse
     */
    public function dataAction()
    {

        $user = $this->getUser()->getId();
        $points = $this->get('soldier_data')->getAmount($user);

        return new JsonResponse($points);
    }
}
