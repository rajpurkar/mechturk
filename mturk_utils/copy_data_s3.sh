#!/bin/bash

BASE_DIR=/local/IMAGES/driving_data_twangcat/all_extracted;
IMG_STEP=50;

PATH=$PATH:$HOME/code/s3cmd/s3cmd-1.5.0-beta1

for IMG_DIR in `find $BASE_DIR -mindepth 1 -maxdepth 1 -type l -or -type d `; do
    echo $IMG_DIR;
    IMG_DIR_BASE=`basename $IMG_DIR`;
    
    N=0;
    for F in `find $IMG_DIR/ -name "*jpeg" | sort -n`; do
	MOD_VAL=$(($N % $IMG_STEP));

	if [ "$MOD_VAL" -eq 0 ]; then 
	    #echo $N;
	    #echo $F;
	    #s3cmd -v put $F s3://sv-images/amt_data/;
	    s3cmd -v put $F s3://sv-images/$IMG_DIR_BASE/;	    
	fi
	
	N=$(($N + 1));
    done 
    echo "total images: $N";

done
