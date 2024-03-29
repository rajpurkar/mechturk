#!/bin/bash
#
# copy_data_s3.sh <dir_with_images1> ... <dir_with_imagesN>
#

source `dirname $0`/data_utils_init.sh

PATH=$PATH:$HOME/code/s3cmd/s3cmd-1.5.0-beta1

# MA: by default copy all data from IMG_DIR_BASE, otherwise use command line arguments
if (( $# == 0 )); then
    N=0;
    for D in `find $IMG_DIR_BASE -mindepth 1 -maxdepth 1 -type l -or -type d `; do
	IMG_DIR_ALL[$N]=$D;
	N=$(($N + 1));			    
    done
else
    NARGS=$#
    for i in `seq 1 $NARGS`; do 
	IMG_DIR_ALL[$((i-1))]=${!i};
    done   
fi

TOTAL_IMGS=0;
for IMG_DIR in "${IMG_DIR_ALL[@]}"; do

    echo $IMG_DIR;
    CUR_BASENAME=`basename $IMG_DIR`;
    
    N=0;
    for F in `find $IMG_DIR/ -name "*jpeg" | sort -n`; do
    	MOD_VAL=$(($N % $IMG_STEP));

    	if [ "$MOD_VAL" -eq 0 ]; then 
    	    s3cmd -v put $F s3://$S3_DIR/$CUR_BASENAME/;	    
    	    TOTAL_IMGS=$(($TOTAL_IMGS + 1));
    	fi
	
    	N=$(($N + 1));
    done 
    echo "images in current directory: $NCOPY";


done
echo "total images: $TOTAL_IMGS";
