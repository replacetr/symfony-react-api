<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Users;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\MoneyType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Asset\Package;
use Symfony\Component\Asset\VersionStrategy\StaticVersionStrategy;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\ProductModel;
use App\Entity\CartModel;
use Symfony\Component\Form\FormBuilderInterface;
use App\DomainModel\ProductDomain;
use App\Form\TestType;



class UserController extends AbstractController
{
    /**
     * @Route("/", name="index" , options={"expose":true})
     */
    public function index()
    {   
        return $this->render('user/index.html.twig');
    }

    /**
     * @Route("/home",name="home")
     * Method({"GET", "POST"})
     */
    public function homeWhere() {

        $repository = $this->getDoctrine()->getRepository(ProductModel::class)->findAll();

        // $package = new Package(new StaticVersionStrategy('v1'));
        // $imagePath = $package->getUrl('/images/logo.png');



        return $this->render('user/home.html.twig', ['products' => $repository]);
 

    
    }

    /**
    * @Route("/addproduct", name="add_product", options={"expose":true})
    * Method({"GET", "POST"})
    */
    public function addProduct(Request $request) {

        // $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $product = new ProductModel();
        $form = $this->createForm(TestType::class, $product);
        
        // dump($request->request);
        // $form->handleRequest($request);

        if ($request->isMethod('GET') && $request->query->get('form')){
            // $file = $form['product_image']->getData();
            
            // // if($file->guessExtension() != 'JPEG' || 'JPG' || PNG )
            // $fileName = md5(uniqid()) .'.'.$file->guessExtension();
            // // Move the file to the directory where brochures are stored
            // try {
            //     $file->move(
            //         $this->getParameter('image_directory'),
            //         $fileName
            //     );
            // } catch (FileException $e) {
            //     // ... handle exception if something happens during file upload
            //     $filename = 'NoImage.jpeg';
            // }
            // $product = $form->getData();
            // //check cni mcm ada bug
            // $product->setProductImage($fileName);

            // $entityManager = $this->getDoctrine()->getManager();
            // $entityManager->persist($product);
            // $entityManager->flush();
            
            return $this->redirectToRoute('home');
         

        }

        
        return $this->render('user/product.html.twig',[ 
            'form' => $form->createView(),
         ]);
    }

    /**
     * @Route("/view/{id}", name="app_view")
     * Method({"POST","GET"})
     */
    public function view($id){
        $repository = $this->getDoctrine()->getRepository(ProductModel::class)->find($id);

        return $this->render('user/view.html.twig', ['product' => $repository]);
    }
    /**
     * @Route("/cart/{id}", name="add_cart")
     * Method({"POST","GET"})
     */
    public function addCart($id){

        $this->denyAccessUnlessGranted('ROLE_USER');

        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        $product = $em->getRepository(ProductModel::class)->find($id);
        $carts = $em->getRepository(CartModel::class)->findby([ 'customer' => $user ]);
        $i = 0;
        foreach ($carts as $cart){

            if($cart->getProduct() === $product){
                echo "sdfsf";
            $qty = $cart->getQty();
            $cart->setQty($qty + 1);
            $em->persist($cart);
            $em->flush();
            return $this->redirectToRoute('view_cart');
               
                $i++;
                
            }
        }
        if($i === 0){
        $newCart = new CartModel();
        $newCart->setQty(1);
        $newCart->setCustomer($user);
        $newCart->setProduct($product);
        $em->persist($newCart);
        $em->flush();
   
        return $this->redirectToRoute('view_cart');
        }

    }

    /**
     * @Route("/viewcart" , name="view_cart")
     */
    public function cartView(Request $request){
        
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser();
        $carts = $this->getDoctrine()->getRepository(CartModel::class)->findby([ 'customer' => $user ]);
        $i = 0;
        $form[]=null;
        foreach ($carts as $cart){

            $form[$i] = $this->createFormBuilder()->add('update', IntegerType::class)->add('save', SubmitType::class)
                ->getForm()->createView();
            $i++;
        }

       

        return $this->render('user/cart.html.twig' , ['products' => $carts, 'form' => $form]);


    }

     /**
     * @Route("/cartremove/{id}" , name="remove_cart")
     */
    public function remove($id){

        $em= $this->getDoctrine()->getManager();
        $carts = $em->getRepository(CartModel::class)->findby(['customer' => $this->getUser()]);
        foreach($carts as $cart){

            if ($cart->getProduct()->getId() == $id)
            {
                $em->remove($cart);
                $em->flush();
            }
        }
        return $this->redirectToRoute('view_cart');
     

    }

    /**
     * @Route("/update/{id}" , name="update_cart")
     */
    public function updateCart($id,Request $request){
        $form = $request->query->get('form');
        $update = $form['update'];
        $em= $this->getDoctrine()->getManager();
        $carts = $em->getRepository(CartModel::class)->findby(['customer' => $this->getUser()]);
        foreach($carts as $cart){

            if ($cart->getProduct()->getId() == $id)
            {
                if($update < 1){
                    $em->remove($cart);
                    $em->flush();
                }else{
                $cart->setQty($update);
                $em->persist($cart);
                $em->flush();
                }
            }
        }
        return $this->redirectToRoute('view_cart');
     

    }
    /**
     * @Route("/x" , name="x_cart")
     */

    public function cartNote(){
         $cart = $this->getDoctrine()->getRepository(CartModel::class)->findby(['customer' => $this->getUser()]);
         $s = count($cart);
         return $this->render('notice.html.twig', ['super' => $s]);
    }

    /**
     * @Route("/image", name="image", methods={"POST"}, options={"expose"=true})
     * @param Request $request
     * 
     */
    public function getImage(Request $request)
    {
        if ($request->isXmlHttpRequest()) {
                $profile = new ProductModel();
                $form = $this->createForm(TestType::class, $profile);
                $form->handleRequest($request);
                // the file
                $file = $_FILES['file'];
                $file = new UploadedFile($file['tmp_name'], $file['name'], $file['type']);
                $filename = $this->generateUniqueName() . '.' . $file->guessExtension();
                $file->move(
                    $this->getTargetDir(),
                    $filename
                );
                $profile->setProductImage($filename);
                $em = $this->getDoctrine()->getManager();
                $em->persist($profile);
                $em->flush();

                

            }
        return new JsonResponse('thank you');
    }
    private function generateUniqueName()
    {
        return md5(uniqid());
    }
    private function getTargetDir()
    {
        return  $this->getParameter('image_directory');
    }

}
