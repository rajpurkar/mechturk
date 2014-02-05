#!/bin/bash

#location on the S3 server
S3_DIR=sv-images/driving_data_twangcat
S3_HOST_DIR=https://s3.amazonaws.com/$S3_DIR

# path to videos 
VIDEO_DIR=/afs/cs.stanford.edu/u/andriluka/mount/scail_group/deeplearning/driving_data/twangcat/raw_data_backup

# path to images 
EXTRACT_DIR=/local/IMAGES/driving_data_twangcat/
IMG_DIR_BASE=$EXTRACT_DIR/all_extracted;

# step to use when copying images to S3 and creating HITs
IMG_STEP=50;



