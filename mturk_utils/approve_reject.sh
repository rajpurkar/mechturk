#!/usr/bin/env sh

. ./mturk_init.sh

"$MTURK_CMD_HOME"/bin/approveWork.sh -approvefile $OUR_DIR/$OUR_NAME.accept

"$MTURK_CMD_HOME"/bin/rejectWork.sh -rejectfile $OUR_DIR/$OUR_NAME.reject

# don't reject empty, check them and them run amt_process_noeval.m
#"$MTURK_CMD_HOME"/bin/rejectWork.sh -rejectfile $OUR_DIR/$OUR_NAME.empty