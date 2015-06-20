#!/bin/sh
#bin/bash

prog="php app/console rabbitmq:consumer save_soldiers"
max=1
for i in $(seq $max); do
    if [ $i -lt $max ]; then
        exec $prog &> /dev/null &
    else
        exec $prog
    fi
done


#parallel -j0 sh r.sh ::: {1..30}
