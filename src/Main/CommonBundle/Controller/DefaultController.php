<?php

namespace Main\CommonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
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
