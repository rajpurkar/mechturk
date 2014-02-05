#!/bin/bash

VIDEO_DIR=/afs/cs.stanford.edu/u/andriluka/mount/scail_group/deeplearning/driving_data/twangcat/raw_data_backup
EXTRACT_DIR=/local/IMAGES/driving_data_twangcat/

VIDEOLIST=$1

for VIDNAME in `cat $VIDEOLIST`; do
    
    VIDFILE=$VIDEO_DIR/$VIDNAME;

    if [[ $VIDNAME == \#* ]]; then
	continue;
    fi

    if [ ! -e $VIDFILE ]; then  
	echo "error: $VIDFILE not found";
	exit;
    else
	echo "VIDFILE: $VIDFILE";
    fi

    if [[ $VIDNAME == *.avi ]]; then
	IMGNAME1=`basename $VIDNAME .avi`; 
	IMGPATH=`dirname $VIDNAME`; 
	IMGNAME2=`basename $IMGPATH`;
	IMGPATH=`dirname $IMGPATH`; 
	IMGNAME3=`basename $IMGPATH`;

	BASENAME=$IMGNAME3-$IMGNAME2-$IMGNAME1;
	CURDIR=$EXTRACT_DIR/$IMGNAME3/$IMGNAME2/$BASENAME;

	echo extracting to: $CURDIR;
	mkdir -p $CURDIR;
	
	ffmpeg -i $VIDFILE -qscale 3 $CURDIR/${BASENAME}_%04d.jpeg

	# make a link in flat hierarchy for easier viewing/copying to S3
	mkdir -p $EXTRACT_DIR/all_extracted
	ln -s $CURDIR $EXTRACT_DIR/all_extracted/
    fi

done

