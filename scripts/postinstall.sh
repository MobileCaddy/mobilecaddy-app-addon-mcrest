#!/bin/bash

echo "Running postinstall.sh, from..."
pwd

servicesdir="../../www/js/services"
testdestdir="../../www/js/services"

if [ -d "$servicesdir" ]; then
		echo "Directory exists!"
    cp js/mcrest.service.js $servicesdir
    cp test/specs/mcresetservice.test.js $testdestdir
fi
