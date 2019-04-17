<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

class UserFixtures extends Fixture
{
     private $passwordEncoder;

         public function __construct(UserPasswordEncoderInterface $passwordEncoder)
       {
           $this->passwordEncoder = $passwordEncoder;
 }
    public function load(ObjectManager $manager)
    {

        // $product = new Product();
        // $manager->persist($product);
        $user = new User;

        $user->setEmail('skeleton@gmail.com');
        $user->setPassword($this->passwordEncoder->encodePassword(
             $user,      '1234'
      ));
        $roles[] = 'ROLE_ADMIN';
        $user->setRoles($roles);
        $manager->persist($user);

        $manager->flush();
    }
}
