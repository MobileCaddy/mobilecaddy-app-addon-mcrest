#!/bin/bash

echo "Running postinstall.sh, from..."
pwd
servicesdir="../../www/js/services"

if [ -d "$servicesdir" ]; then
		echo "Directory exists!"
    cp js/mcrest.service.js $servicesdir
fi
