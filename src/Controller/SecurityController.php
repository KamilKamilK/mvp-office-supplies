<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // Jeśli użytkownik jest zalogowany, można przekierować np. na stronę główną
        if ($this->getUser()) {
            return $this->redirectToRoute('app_homepage');
        }

        // Błąd logowania (jeżeli wystąpił)
        $error = $authenticationUtils->getLastAuthenticationError();

        // Ostatnio wpisany login
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
        // Metoda może być pusta - Symfony przejmie obsługę przez firewall
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
