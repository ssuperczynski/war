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

    /**
     * @return JsonResponse
     */
    public function mapUsersAction()
    {
        $coordinates = $this->getDoctrine()->getRepository('MainCommonBundle:Profile')->getUsersForMap();

        return new JsonResponse(
            [
                'coordinates' => $coordinates
            ]
        );
    }


    /**
     * @param int $id
     * @return JsonResponse
     */
    public function userDataAction($id)
    {
        $data = $this->getDoctrine()->getRepository('MainCommonBundle:Points')->findOneBy(['user' => $id]);

        return new JsonResponse($data);
    }
}
