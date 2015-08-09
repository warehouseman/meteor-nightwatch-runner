#!/bin/bash
#
echo "Purging meteor-nightwatch-runner from this filesystem."
cd $(dirname $0)
pwd
cd ./config
rm -f example_circle.yml
rm -f globals.json
rm -f nightwatch.json
rm -f constants.js
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../config
cd ../bin
rm -f logger.js
rm -f nightwatch.js
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../bin
cd ../walkthroughs
rm -f example.js
rm -f bracketNightWatchTests.js
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../walkthroughs
cd ../node_modules/.bin
rm -f chromedriver
rm -f mkdirp
rm -f nightwatch
rm -f touch
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../.bin
cd ..
rm -fr chromedriver
rm -fr mkdirp
rm -fr nightwatch
rm -fr touch
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../node_modules
cd ..
rm -f runTests.js
rm -fr ./remove-meteor-nightwatch-runner.sh*
rm -fr ./.gitignore

[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../nightwatch
cd ..
[ `ls -1A . | wc -l` -eq 0 ] && rm -fr ../tests
