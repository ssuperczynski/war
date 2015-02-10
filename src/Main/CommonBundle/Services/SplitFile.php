<?php

namespace Main\CommonBundle\Services;

use OldSound\RabbitMqBundle\RabbitMq\Producer;

/**
 * Class SplitFile
 * @package Main\CommonBundle\Services
 */
class SplitFile
{
    /** @var  Producer $producer */
    private $producer;

    public function __construct($producer)
    {
        $this->producer = $producer;
    }

    public function process($userId, $time, $range)
    {
        $data = [
            'user' => $userId,
            'time' => $time,
            'range' => $range
        ];

        $this->producer->publish(json_encode($data));
    }
}