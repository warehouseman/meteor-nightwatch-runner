#!/bin/bash
#
mkdir -p tryMNWRInst
mkdir -p meteor-nightwatch-runner_bk
cp rebuild-meteor-nightwatch-runner-installer.sh ./meteor-nightwatch-runner
cp -R ./meteor-nightwatch-runner/* ./meteor-nightwatch-runner_bk/
cd ./meteor-nightwatch-runner_bk/
rm -f LICENSE
rm -f README.md
rm -f rebuild-meteor-nightwatch-runner-installer.sh
makeself --current . meteor-nightwatch-runner.run "Installing meteor-nightwatch-runner" ./install-meteor-nightwatch-runner.sh
chmod a+x meteor-nightwatch-runner.run
cp meteor-nightwatch-runner.run ../tryMNWRInst/
cp meteor-nightwatch-runner.run ../meteor-nightwatch-runner
cd ..
cd ./tryMNWRInst
./meteor-nightwatch-runner.run
tree
./tests/nightwatch/remove-meteor-nightwatch-runner.sh
pwd
ls -l
printf "Done ? Hit <enter>."
read _
cd ..
rm -fr tryMNWRInst
rm -fr meteor-nightwatch-runner_bk

