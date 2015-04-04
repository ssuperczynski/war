<?php
// src/Acme/UserBundle/Entity/User.php

namespace Main\CommonBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser implements \JsonSerializable
{
    const ROLE_USER = 'ROLE_USER';
    const ROLE_ADMIN = 'ROLE_ADMIN';

    const ID = 'id';
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $coordinateX;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    protected $coordinateY;

    /**
     *
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            self::ID => $this->getId()
        ];
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set coordinateX
     *
     * @param integer $coordinateX
     * @return User
     */
    public function setCoordinateX($coordinateX)
    {
        $this->coordinateX = $coordinateX;

        return $this;
    }

    /**
     * Get coordinateX
     *
     * @return integer 
     */
    public function getCoordinateX()
    {
        return $this->coordinateX;
    }

    /**
     * Set coordinateY
     *
     * @param integer $coordinateY
     * @return User
     */
    public function setCoordinateY($coordinateY)
    {
        $this->coordinateY = $coordinateY;

        return $this;
    }

    /**
     * Get coordinateY
     *
     * @return integer 
     */
    public function getCoordinateY()
    {
        return $this->coordinateY;
    }
}
