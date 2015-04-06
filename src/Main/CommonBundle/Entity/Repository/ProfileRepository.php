<?php

namespace Main\CommonBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Main\CommonBundle\Entity\Profile;


/**
 * Class UserRepository
 * @package Main\CommonBundle\Entity\Repository
 */
class ProfileRepository extends EntityRepository
{
    /**
     * @return array|\Main\CommonBundle\Entity\User[]
     */
    public function getUsersForMap()
    {
        return $this->_em->getRepository(Profile::class)->findAll();
    }
}
