#!/bin/bash

FNAME=User_296176_workers_qual_new_feedback_slash.csv

POS=0;
NEG=0;

for L in `cat $FNAME`; do 
    WORKERID=`dirname $L`;
    Q=`basename $L`;
    
    if (( $Q > 1 )); then 
	echo $WORKERID;
	POS=$(($POS + 1));
    else
	NEG=$(($NEG + 1));
    fi
done 

echo "POS: $POS";
echo "NEG: $NEG";