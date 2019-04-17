<?php
namespace App\DomainModel;

use App\DomainModel\CartDomain;
use APP\Entityy\ProductModel;


class ProductDomain {
    
    private $products;
    
    public function __construct(){
        $repository = $this->getDoctrine()->getRepository(ProductModel::class);
        $this->products = $repository->findAll();
    }


    
    public function selectProduct($productId,$userId)  {

        $cart = new CartDomain($userId);

        foreach ($products as $product){
            if ($product['id'] === $productId){

                return $cart->addProduct($productId,$product['price']);

            }
        }
        

    }
}