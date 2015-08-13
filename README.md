###Fault tolerant war simulator, based on Redis key value db with Apache Spark streaming and Azure Machine Learning.###

Technology stack: <br>
Redis - cache database, pub/sub protocol support <br>
node.js - websocket support <br>
Symfony2 - web interface <br>
AngularJS - frontend support <br>
Hive, Apache Spark, logstash - Big data analytic support <br>
Azure ML - Machine learning to analyze Spark logs <br>
Scala - backend support <br>

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
