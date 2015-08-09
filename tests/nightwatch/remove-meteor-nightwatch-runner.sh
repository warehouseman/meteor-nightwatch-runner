#!/bin/bash
#
echo "Purging meteor-nightwatch-runner from this filesystem."
cd $(dirname $0)
ls -l ./config/example_circle.yml
ls -l ./runner.js
ls -l ./test-all.sh
ls -l ./test-package.sh
ls -l ./remove-meteor-nightwatch-runner.sh
#
rm -fr ./config/example_circle.yml
rm -fr ./runner.js
rm -fr ./test-all.sh
rm -fr ./test-package.sh
rm -fr ./remove-meteor-nightwatch-runner.sh
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../nightwatchs
cd ..
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../tests
