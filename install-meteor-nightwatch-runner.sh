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
#
cd ./tests/nightwatch/bin/
chmod a+x ./install-nightwatch-dependencies.sh
source ./install-nightwatch-dependencies.sh
cd ../../..

chmod ug+rwx ./tests/tinyTests/ci/installSeleniumWebdriver.sh

if [ -d "./tests/nightwatch/" ]; then
  echo "Removing installer files from directory -- $(pwd)."
  rm -f ${THIS}.run
  rm -f install-meteor-nightwatch-runner.sh
else
  echo "* * * ERROR * * * wrong directory -- $(pwd)."
fi
