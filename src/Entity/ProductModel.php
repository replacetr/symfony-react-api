<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductModelRepository")
 */
class ProductModel
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $product_name;

    /**
     * @ORM\Column(type="float")
     */
    private $product_price;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $product_image;
    
    /**
     * @ORM\Column(type="integer")
     */
    private $product_stock;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProductName(): ?string
    {
        return $this->product_name;
    }

    public function setProductName(string $product_name): self
    {
        $this->product_name = $product_name;

        return $this;
    }

    public function getProductPrice(): ?float
    {
        return $this->product_price;
    }

    public function setProductPrice(float $product_price): self
    {
        $this->product_price = $product_price;

        return $this;
    }

    public function getProductImage(): ?string
    {
        return $this->product_image;
    }

    public function setProductImage(string $product_image): self
    {
        $this->product_image = $product_image;

        return $this;
    }

    public function getProductStock(): ?int
    {
        return $this->product_stock;
    }

    public function setProductStock(int $product_stock): self
    {
        $this->product_stock = $product_stock;

        return $this;
    }


}
