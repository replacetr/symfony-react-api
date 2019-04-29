<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use FOS\RestBundle\Request\ParamFetcher;
use App\Entity\ProductModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Doctrine\DBAL\Driver\PDOException;
use App\Entity\Test;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use App\Entity\OrderModel;

class AdminController extends AbstractFOSRestController
{

    public function getAdminOrdersAction()
    {
        $data = $this->getDoctrine()->getRepository(OrderModel::class)->findBy(['user' => $this->getUser()]);

        return $this->view($data, Response::HTTP_OK);
    }



    public function postAdminTaskAction(Request $request)
    {

        $test = new ProductModel();
        $test->setProductImage('entah');
        $em = $this->getDoctrine()->getManager();
        $em->persist($test);
        $em->flush();

        $data = [
            'message' => 'success'
        ];


        return $this->view($data, Response::HTTP_OK);
    }

    /**
     * @Rest\RequestParam(name="title", description="Title of the new task", nullable=false)
     * @param ParamFetcher $paramFetcher
     */

    public function getAdminAction()
    {
        return $this->view(['message' => 'ini admin'], Response::HTTP_OK);
    }

    public function getUserAction()
    {
        return $this->view(['message' => 'ini user'], Response::HTTP_OK);
    }

    public function deleteAdminAllAction()
    {
        $em = $this->getDoctrine()->getManager();
        $orders = $em->getRepository(OrderModel::class)->findAll();

        foreach ($orders as $order) {

            $em->remove($order);
            $em->flush();
        }

        return $this->view(['message' => 'deleted all'], Response::HTTP_OK);
    }
}
