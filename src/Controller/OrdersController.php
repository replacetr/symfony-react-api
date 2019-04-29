<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\CartModelRepository;
use App\Entity\OrderDetails;
use App\Entity\OrderModel;

class OrdersController extends AbstractController
{
    private $cartModelRepository;
    public function __construct(CartModelRepository $cartModelRepository)
    {
        $this->cartModelRepository = $cartModelRepository;
    }
    /**
     * @Route("/orders", name="orders")
     */
    public function index()
    {
        $carts = $this->cartModelRepository->findBy(['customer' => $this->getUser()]);
        $notEnoughStock = 0;
        //check cart if stock is enough
        foreach ($carts as $cart) {
                if (($cart->getProduct()->getProductStock() - $cart->getQty()) < 0) {
                    $notEnoughStock += 1;
                }
            }

        if ($notEnoughStock === 0) {
            $this->createOrder();

            $data = $this->getDoctrine()->getRepository(OrderModel::class)->findAll();

            


        } else {
                $this->addFlash('warning', 'Sorry we dont have enough Stock');
                return $this->redirectToRoute('view_cart');
            }


        return $this->render('orders/index.html.twig', [
            'controller_name' => 'OrdersController',
        ]);
    }

    private function createOrder()
    {
        $user = $this->getUser();
        $carts = $this->cartModelRepository->findBy(['customer' => $this->getUser()]);
        $order = new OrderModel();
        $order->setUser($user);
        $em = $this->getDoctrine()->getManager();

        $i = 0;
        $total = 0;
        $order->setTotal($total);
        $em->persist($order);
        foreach($carts as $cart){
            
            $orderDetails = new OrderDetails();
            $orderDetails->setProduct($cart->getProduct());
            $orderDetails->setQty($cart->getQty());
            $orderDetails->setOrders($order);
            $em->persist($orderDetails);
            $em->flush();
            $total = $total + ($cart->getProduct()->getProductPrice() * $cart->getQty());
            //todo stock recount


        }
        $order->setTotal($total);
        $em->persist($order);
        $em->flush();


    }
}
