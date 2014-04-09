#!/bin/bash

source `dirname $0`/data_utils_init.sh

if (( $# < 1 )); then
    echo "usage: extract_data.sh <FILE_WITH_LIST_OF_VIDEOS>"
    exit;
fi

VIDEOLIST=$1
echo "VIDEOLIST: $VIDEOLIST"

for VIDNAME in `cat $VIDEOLIST`; do
    
    if [[ "$VIDNAME" = /* ]]; then 
    	VIDFILE=$VIDNAME
    else
    	VIDFILE=$VIDEO_DIR/$VIDNAME;
    fi

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

	# twantcat
	#IMGNAME3=`basename $IMGPATH`;
	#BASENAME=$IMGNAME3-$IMGNAME2-$IMGNAME1;
	#CURDIR=$EXTRACT_DIR/$IMGNAME3/$IMGNAME2/$BASENAME;

	# q50-data
	BASENAME=$IMGNAME2-$IMGNAME1;
	CURDIR=$EXTRACT_DIR/$IMGNAME2/$BASENAME;

	echo extracting to: $CURDIR;
	mkdir -p $CURDIR;
	
	#ffmpeg -i $VIDFILE -qscale 3 $CURDIR/${BASENAME}_%04d.jpeg
	ffmpeg -i $VIDFILE -qscale 3 $CURDIR/${BASENAME}_%06d.jpeg

	# make a link in flat hierarchy for easier viewing/copying to S3
	mkdir -p $EXTRACT_DIR/all_extracted
	#ln -s $CURDIR $EXTRACT_DIR/all_extracted/

	# make a relative link (need link that works after copying to the scail filesystem)
	#ln -s ../$IMGNAME3/$IMGNAME2/$BASENAME $EXTRACT_DIR/all_extracted/$BASENAME
	ln -s ../$IMGNAME2/$BASENAME $EXTRACT_DIR/all_extracted/$BASENAME
    fi

done

