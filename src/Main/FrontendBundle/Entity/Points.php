<?php

namespace Main\FrontendBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Points
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Main\FrontendBundle\Entity\PointsRepository")
 */
class Points implements \JsonSerializable
{
    const JSON_ID = 'id';
    const JSON_USER = 'user';
    const JSON_SOLDIER = 'soldier';
    const JSON_FOOD = 'food';
    const JSON_METAL = 'metal';
    const JSON_CONCRETE = 'concrete';
    const JSON_DATE = 'date';
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
     * @ORM\Column(name="user_id", type="integer")
     */
    private $userId;

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
     * @ORM\Column(name="metal", type="integer")
     */
    private $metal;

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
     * Set userId
     *
     * @param integer $userId
     * @return Points
     */
    public function setUserId($userId)
    {
        $this->userId = $userId;

        return $this;
    }

    /**
     * Get userId
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->userId;
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
     * Set metal
     *
     * @param integer $metal
     * @return Points
     */
    public function setMetal($metal)
    {
        $this->metal = $metal;

        return $this;
    }

    /**
     * Get metal
     *
     * @return integer 
     */
    public function getMetal()
    {
        return $this->metal;
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

    public function jsonSerialize(){
        return [
            self::JSON_ID => $this->getId(),
            self::JSON_USER => $this->getUserId(),
            self::JSON_SOLDIER => $this->getSoldier(),
            self::JSON_FOOD => $this->getFood(),
            self::JSON_METAL => $this->getMetal(),
            self::JSON_CONCRETE => $this->getConcrete(),
            self::JSON_DATE => $this->getDate()->format('Y-m-d H:i')
        ];
    }
}
