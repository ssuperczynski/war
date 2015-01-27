<?php

namespace Main\FrontendBundle\Controller;

use Main\CommonBundle\Entity\SoldiersQueue;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class PointsController
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

    public function addSoldierToQueueAction(Request $request){
        $data = json_decode($request->getContent(), false);

        $soldier = new SoldiersQueue();
        $soldier->setUserId($this->getUser()->getId());
        $soldier->setTime(new \DateTime());
        $soldier->setAmount($data->amount);
        $soldier->setType($data->type);

        $em = $this->getDoctrine()->getManager();
        $em->persist($soldier);
        $em->flush();

        return new JsonResponse('ok');
    }
}