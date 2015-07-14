<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function spyUserAction(Request $request)
    {
        $data = json_decode($request->getContent());
        $this->get('spy_service')->startSpy($this->getUser()->getId(), $data->id, $data->distance);

        return new JsonResponse(Response::HTTP_OK);
    }
}
