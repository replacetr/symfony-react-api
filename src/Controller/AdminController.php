<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use App\Entity\ProductModel;
use App\Entity\User;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;




class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(Request $request)
    {   
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        // if($request->isXmlHttpRequest()){
        //     throw new \Exception('please login to continue');
        //     return $this->json(['username' => 'saitan iblis']);

        // }
       
        // return $this->render('admin/index.html.twig', [
        //     'controller_name' => 'AdminController',
        // ]);
        // $user = [
        //     'username'  => 'budu'
        // ];
        $user = $this->getUser();


        $repository = $this->getDoctrine()->getRepository(ProductModel::class)->findAll();

        // var_dump($jsonContent);
        // die();

        

     



        return $this->json($repository);
    }




}