<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderDetailsRepository")
 */
class OrderDetails
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductModel")
     */
    private $product;

    /**
     * @ORM\Column(type="integer")
     */
    private $qty;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\OrderModel", inversedBy="orderdetails")
     */
    private $orders;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQty(): ?int
    {
        return $this->qty;
    }

    public function setQty(int $qty): self
    {
        $this->qty = $qty;

        return $this;
    }

    public function getProduct(): ?ProductModel
    {
        return $this->product;
    }

    public function setProduct(?ProductModel $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getOrders(): ?OrderModel
    {
        return $this->orders;
    }

    public function setOrders(?OrderModel $orders): self
    {
        $this->orders = $orders;

        return $this;
    }

 
}
