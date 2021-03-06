<?php

namespace Main\CommonBundle\Services;

use OldSound\RabbitMqBundle\RabbitMq\Producer;

/**
 * Class SoldierQueue
 * @package Main\CommonBundle\Services
 */
class BuildingQueue
{
    /** @var  Producer $producer */
    private $producer;

    public function __construct($producer)
    {
        $this->producer = $producer;
    }

    public function process($userId, $time, $range, $amount)
    {
        $data = [
            'user' => $userId,
            'time' => $time,
            'range' => $range,
            'amount' => $amount
        ];

        $this->producer->publish(json_encode($data));
    }
}