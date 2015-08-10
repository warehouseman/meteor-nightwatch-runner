#!/bin/bash
#
# echo $(dirname $0)
# cd $(dirname $0)/..
#
# echo "  -- Ready to install NightWatch runner dependencies in -- $(pwd)."
echo "  -- Ready to install NightWatch runner dependencies."
#
export LOCAL_NODEJS=${HOME}
export LOCAL_NODEJS_MODULES=${LOCAL_NODEJS}/node_modules
mkdir -p ${LOCAL_NODEJS_MODULES}
#
modules=( "touch" "bunyan" "underscore" "mkdirp" "nightwatch" "chromedriver" "minimist" "fs-extra" "request" )
for idx in "${modules[@]}"
do
  :
  if [ ! -d ${LOCAL_NODEJS_MODULES}/${idx}/ ]; then
    echo "Installing '${idx}' in directory -- ${LOCAL_NODEJS_MODULES}."
    npm install -y --prefix ${LOCAL_NODEJS} ${idx};
  else
    echo "Node module '${idx}' is already available.";
  fi;
done
#
echo "  -- linking to chronedriver -- ${LOCAL_NODEJS_MODULES}."
ln -s ${LOCAL_NODEJS_MODULES}/chromedriver chromedriver
#
echo "  -- installing Selenium in directory -- ${LOCAL_NODEJS_MODULES} $(pwd)."
wget -P ${LOCAL_NODEJS_MODULES} --no-clobber http://selenium-release.storage.googleapis.com/2.47/selenium-server-standalone-2.47.1.jar
ln -s ${LOCAL_NODEJS_MODULES}/selenium-server-standalone-2.47.1.jar selenium-server-standalone.jar
#
echo "Dependencies loaded."



