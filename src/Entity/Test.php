<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TestRepository")
 */
class Test
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private $paypal;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaypal()
    {
        return $this->paypal;
    }

    public function setPaypal($paypal): self
    {
        $this->paypal = $paypal;

        return $this;
    }
}
