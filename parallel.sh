#!/bin/sh
#bin/bash

parallel -j0 sh r.sh ::: {1..3000}