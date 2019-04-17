<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\ProductModel;

class SearchBarController extends AbstractController
{
    /**
     * @Route("/search/bar", name="search_bar")
     */
    public function index()
    {

        $form = $this->createFormBuilder()
        ->add('text')
        ->add('search', SubmitType::class)
        ->getForm();
        return $this->render('search_bar/index.html.twig', [
            'form' => $form->createView() ,
        ]);
    }

    /**
     * @Route("/searching" , name="searching")
     */
    public function searching(Request $request){

        $form = $request->request->get('form');
       
        
        $search = $this->getDoctrine()->getRepository(ProductModel::class)->findByLike($form['text']);
        
        return $this->render('user/home.html.twig', ['products' => $search]);

    }
}
