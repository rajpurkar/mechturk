# 
# mturk_make_input.sh <HIT_DIR> 
# or 
# mturk_make_input.sh <HIT_DIR> <IMG_DIR>
#

S3_HOST_DIR=https://s3.amazonaws.com/sv-images

HIT_DIR=$1
HIT_NAME=`basename $HIT_DIR`

NARGS=$#

if (( $# > 1 )); then
    IMG_DIR=$2
else
    IMG_DIR_BASE=/local/IMAGES/driving_data_twangcat/tmp
    IMG_DIR=${IMG_DIR_BASE}/${HIT_NAME}

    IMG_DIR_1=`basename $IMG_DIR`;
fi

echo "IMG_DIR: $IMG_DIR"
echo "IMG_DIR_1: $IMG_DIR_1"
echo "HIT_DIR: $HIT_DIR"


rm -f ${HIT_DIR}/input
echo "urls" > ${HIT_DIR}/input
echo $IMG_DIR > ${HIT_DIR}/input_imgdir.txt

echo "saving results to $HIT_DIR/input"
find $IMG_DIR -name "*jpeg" -printf "${S3_HOST_DIR}/${IMG_DIR_1}/%f\n" | sort -n >> ${HIT_DIR}/input

