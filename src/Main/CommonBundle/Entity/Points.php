<?php

namespace Main\CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Points
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Main\CommonBundle\Entity\Repository\PointsRepository")
 */
class Points implements \JsonSerializable
{
    const ID = 'id';
    const USER = 'user';
    const SOLDIER = 'soldier';
    const FOOD = 'food';
    const IRON = 'iron';
    const CONCRETE = 'concrete';
    const DATE = 'date';
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
     * @ORM\OneToOne(targetEntity="Main\CommonBundle\Entity\User")
     */
    private $user;

    /**
     * @var integer
     *
     * @ORM\Column(name="soldier", type="integer")
     */
    private $soldier;

    /**
     * @var integer
     *
     * @ORM\Column(name="food", type="integer")
     */
    private $food;

    /**
     * @var integer
     *
     * @ORM\Column(name="iron", type="integer")
     */
    private $iron;

    /**
     * @var integer
     *
     * @ORM\Column(name="concrete", type="integer")
     */
    private $concrete;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * initial data
     */
    public function __construct()
    {
        $this->soldier = 10;
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
     * Set date
     *
     * @param \DateTime $date
     * @return Points
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set soldier
     *
     * @param integer $soldier
     * @return Points
     */
    public function setSoldier($soldier)
    {
        $this->soldier = $soldier;

        return $this;
    }

    /**
     * Get soldier
     *
     * @return integer
     */
    public function getSoldier()
    {
        return $this->soldier;
    }


    /**
     * Set food
     *
     * @param integer $food
     * @return Points
     */
    public function setFood($food)
    {
        $this->food = $food;

        return $this;
    }

    /**
     * Get food
     *
     * @return integer
     */
    public function getFood()
    {
        return $this->food;
    }

    /**
     * Set concrete
     *
     * @param integer $concrete
     * @return Points
     */
    public function setConcrete($concrete)
    {
        $this->concrete = $concrete;

        return $this;
    }

    /**
     * Get concrete
     *
     * @return integer
     */
    public function getConcrete()
    {
        return $this->concrete;
    }

    /**
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            self::ID => $this->getId(),
            self::USER => $this->getUser()->getId(),
            self::SOLDIER => $this->getSoldier(),
            self::FOOD => $this->getFood(),
            self::IRON => $this->getIron(),
            self::CONCRETE => $this->getConcrete(),
            self::DATE => $this->getDate()->format('Y-m-d H:i')
        ];
    }

    /**
     * Set iron
     *
     * @param integer $iron
     * @return Points
     */
    public function setIron($iron)
    {
        $this->iron = $iron;

        return $this;
    }

    /**
     * Get iron
     *
     * @return integer
     */
    public function getIron()
    {
        return $this->iron;
    }

    /**
     * Set user
     *
     * @param \Main\CommonBundle\Entity\User $user
     * @return Points
     */
    public function setUser(\Main\CommonBundle\Entity\User $user = null)
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
