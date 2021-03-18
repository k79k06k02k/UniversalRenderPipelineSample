#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0);pwd)
DIR=$(dirname $SCRIPT_DIR)

SCRIPTS=(pre-commit post-checkout post-merge prepare-commit-msg)

for SCRIPT in "${SCRIPTS[@]}"; do
	#echo From:"$SCRIPT_DIR/$SCRIPT"
	#echo To: :"$DIR/.git/hooks/$SCRIPT"

	cp "$SCRIPT_DIR/$SCRIPT" "$DIR/.git/hooks/$SCRIPT"
	echo "Installed $SCRIPT"
done

$SHELL


 