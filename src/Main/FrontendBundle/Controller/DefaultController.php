<?php

namespace Main\FrontendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class DefaultController
 * @package Main\FrontendBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        if (true === $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->render('MainFrontendBundle:Default:index.html.twig');
        }

        return $this->render('MainFrontendBundle:Default:landing.html.twig');
    }

    /**
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function logoutProfileAction()
    {
        $tokenStorage = $this->get('security.token_storage');
        $sessionService = $this->get('session');

        $message = 'Wylogowano pomyślnie!';
        $sessionService->getFlashBag()->add('notice', $message);
        $tokenStorage->setToken(null);

        return $this->redirect($this->generateUrl('frontend.homepage'));
    }
}
