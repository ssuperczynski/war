<?php

namespace Main\CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Profile
 *
 * @ORM\Table(name="profile")
 * @ORM\Entity(repositoryClass="Main\CommonBundle\Entity\Repository\ProfileRepository")
 */
class Profile implements \JsonSerializable
{
    /**
     *
     */
    const ID = 'id';
    const COORDINATEX = 'coordinateX';
    const COORDINATEY = 'coordinateY';

    /**
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            self::ID => $this->getId(),
            self::COORDINATEX => $this->getCoordinateX(),
            self::COORDINATEY => $this->getCoordinateY(),
        ];
    }

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="coordinateX", type="integer")
     */
    private $coordinateX;

    /**
     * @var integer
     *
     * @ORM\Column(name="coordinateY", type="integer")
     */
    private $coordinateY;

    /**
     * @ORM\OneToOne(targetEntity="Main\CommonBundle\Entity\User")
     */
    private $user;


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
     * @return Profile
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
     * @return Profile
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

    /**
     * Set user
     *
     * @param User $user
     * @return Profile
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Main\CommonBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
