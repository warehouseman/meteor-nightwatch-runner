#!/bin/bash
#
echo $(dirname $0)
cd $(dirname $0)/..
#
echo "  -- Ready to install NightWatch runner dependencies in -- $(pwd)."
#
echo "  -- installing node-touch in directory -- $(pwd)."
npm install -y --prefix . touch
#
echo "  -- installing node-mkdirp in directory -- $(pwd)."
npm install -y --prefix . mkdirp
#
echo "  -- installing nightwatch in directory -- $(pwd)."
npm install -y --prefix . nightwatch
#
echo "  -- installing chromedriver in directory -- $(pwd)."
npm install -y --prefix . chromedriver
#
echo "  -- installing bunyan in directory -- $(pwd)."
npm install -y --prefix . bunyan
#
echo "  -- installing minimist in directory -- $(pwd)."
npm install -y --prefix . minimist
#
echo "  -- installing underscore in directory -- $(pwd)."
npm install -y --prefix . underscore
#
echo "  -- installing fs-extra in directory -- $(pwd)."
npm install -y --prefix . fs-extra
#
cd node_modules
echo "  -- installing Selenium in directory -- $(pwd)."
wget --no-clobber http://selenium-release.storage.googleapis.com/2.47/selenium-server-standalone-2.47.1.jar
#


