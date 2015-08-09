#!/bin/bash
#
# This installer was made with 'makeself' by Stéphane Peter (megastep at megastep.org)
# The command used was :
#    makeself --current . meteor-nightwatch-runner.run "Installing meteor-nightwatch-runner" ./install.sh
# It expects be run in the target directory
# To un-install execute ./tests/nightwatchs/remove-meteor-nightwatch-runner.sh
#
export THIS=meteor-nightwatch-runner
echo "Preparing ${THIS} in project directory -- $(pwd)."
cd tests/nightwatch
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
cd bin
echo "  -- installing Selenium in directory -- $(pwd)."
wget --no-clobber http://selenium-release.storage.googleapis.com/2.47/selenium-server-standalone-2.47.1.jar

cd ../../..

echo "Removing installer files from directory -- $(pwd)."
rm -f ${THIS}.run
rm -f install-meteor-nightwatch-runner.sh
