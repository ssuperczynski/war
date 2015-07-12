# README #

* 1. Start supervisor: /usr/local/bin/supervisord
* 2. Run supervisor CLI: http://localhost:9009
* 3. Run rabbitMQ: http://localhost:15672/#/
* 4. Run redis-cli and then MONITOR
* 5. Run scala worker `java jar worker.jar`
* 6. Run php app/console server:run
* 7. Run php app/console rabbitmq:consumer save_soldiers
* 8. socket-redis


# Core logic #

[draw.io](https://drive.google.com/file/d/0B1wggjwptA_BZ2RpVjdSajBjQ2M/view?usp=sharing)