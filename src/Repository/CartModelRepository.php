<?php

namespace App\Repository;

use App\Entity\CartModel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CartModel|null find($id, $lockMode = null, $lockVersion = null)
 * @method CartModel|null findOneBy(array $criteria, array $orderBy = null)
 * @method CartModel[]    findAll()
 * @method CartModel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CartModelRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CartModel::class);
    }

    // /**
    //  * @return CartModel[] Returns an array of CartModel objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CartModel
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
