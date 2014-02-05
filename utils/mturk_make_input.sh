# 
# mturk_make_input.sh <HIT_DIR> 
# or 
# mturk_make_input.sh <HIT_DIR> <IMG_DIR1> <IMG_DIR2> ... <IMG_DIR_N>
#

source `dirname $0`/data_utils_init.sh

HIT_DIR=$1
HIT_NAME=`basename $HIT_DIR`

if (( $# < 2 )); then
    IMG_DIR[1]="${IMG_DIR_BASE}/${HIT_NAME}";
else
    NARGS=$#
    for i in `seq 2 $NARGS`; do 
	IMG_DIR[$((i-1))]=${!i};
    done   
fi

echo "HIT_DIR: $HIT_DIR"

rm -f ${HIT_DIR}/input_imgdir.txt

echo "saving results to $HIT_DIR/input"
rm -f ${HIT_DIR}/input
echo "urls" > ${HIT_DIR}/input

for CUR_DIR in "${IMG_DIR[@]}"; do
    if [ -d $CUR_DIR ]; then
	CUR_DIR_1=`basename $CUR_DIR`;
	echo "CUR_DIR: $CUR_DIR"
	echo "CUR_DIR_1: $CUR_DIR_1"

	echo "$CUR_DIR" >> ${HIT_DIR}/input_imgdir.txt    

	# for fname in `find -L $CUR_DIR -name "*jpeg" -printf "${S3_HOST_DIR}/${CUR_DIR_1}/%f\n" | sort -n`; do
     	#     echo $fname >> ${HIT_DIR}/input
	# done

	N=0;
	for fname in `find -L $CUR_DIR -name "*jpeg" -printf "${S3_HOST_DIR}/${CUR_DIR_1}/%f\n" | sort -n`; do
	    MOD_VAL=$(($N % $IMG_STEP));
	
     	    if [ "$MOD_VAL" -eq 0 ]; then 
		echo $fname >> ${HIT_DIR}/input
	    fi

	    N=$(($N + 1));	
	done

    else
	echo "error: $CUR_DIR does not exist or is not a directory";
	exit;
    fi
done 
