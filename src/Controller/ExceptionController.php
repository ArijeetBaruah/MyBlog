<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ExceptionController extends AbstractController
{
    public function showAction()
    {
        return $this->render('app/error.html.twig', []);
    }
}
