<?php
namespace App\DomainModel;
use App\Entity\CartModel;


class CartDomain {

    Private $productList;
    Private $total;

    public function __construct($userId){

        //query for model by userID

        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT p
            FROM App\Entity\CartModel p
            WHERE p.user_id = :user_id
            '
        )->setParameter('user_id', $userId);

        $productList = $query->execute();
    
    }
    
    

    Public function addProduct(&$productArray){
        $i = 0;
        
        foreach ($this->productList as $arr){

            if ($product['product_id'] === $productArray['product_id'])
            {
                $i++;
            }
        }
        
        

        if ($i>1)
        {
            $this->total =  $productArray['product_price'] * $i;
            $this->productList = array_merge(
                $this->productList, $productArray
            );
               
            
            
            
        }
        else    
        {

            $this->total =  $productArray['product_price'];
            $this->productList = array_merge(
            $this->productList, $productArray
            );
                
        }

        $conn = $this->getEntityManager()->getConnection();

        

        if (empty($this->productList)){
            return null;
        }
        else {
            $sql = '
            DELETE FROM cart_model';
            $stmt = $conn->prepare($sql);
            $stmt->executeUpdate();   
            
            $cart = new CartModel();
            $entityManager = $this->getDoctrine()->getManager();
            foreach($this->productList as $row){

                $cart->setUserId($row['user_id']);
                $cart->setProductId($row['product_id']);
                $cart->setQty($row['qty']);
                $cart->setCartPrice($row['cart_price']);
                $cart->setPriceQty($row['price_qty']);

                $entityManager->persist($cart);
                $entityManager->flush();
                }
            }
            return $this->total;
  

            
            
            
        }


    }


