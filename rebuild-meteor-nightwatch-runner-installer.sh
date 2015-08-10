#!/bin/bash
#
# This script plays no part in Meteor Nightwatch Runner.
# Instead it used to facilitate packaging up and testing
# the installer and uninstaller of Meteor Nightwatch Runner.
#
if [[ -d ./tryMNWRInst ]]; then
  echo "Test app already present";
else
  echo "Preparing temporary test app";
  meteor create tryMNWRInst;
fi
#
# Back up this script to version contolled directory
cp rebuild-meteor-nightwatch-runner-installer.sh ./meteor-nightwatch-runner
#
# Create an intermediate copy directory that will contain only the
# exact files that need to be in the installer
mkdir -p meteor-nightwatch-runner_bk
cp -R ./meteor-nightwatch-runner/* ./meteor-nightwatch-runner_bk/
#
# Step into it.
cd ./meteor-nightwatch-runner_bk/
#
# Delete all script support files
rm -f LICENSE
rm -f README.md
rm -f rebuild-meteor-nightwatch-runner-installer.sh
rm -f meteor-nightwatch-runner.run
#
# Make a self extracting installer archive
makeself --current . meteor-nightwatch-runner.run "Installing meteor-nightwatch-runner" ./install-meteor-nightwatch-runner.sh
#
# Make the installer executable
chmod a+x meteor-nightwatch-runner.run
#
# Copy it into the temporary test app
cp meteor-nightwatch-runner.run ../tryMNWRInst/
#
# Also, copy it to the version contolled directory
cp meteor-nightwatch-runner.run ../meteor-nightwatch-runner
#
# Step into  the temporary test app directory and install Meteor Nightwatch Runner
cd ../tryMNWRInst
./meteor-nightwatch-runner.run
#
tree -aL 4
echo "
Is everything as expected?"
echo "Now test the installation. Hit <enter> when done."
read _
#
# Now, undo the installation
./tests/nightwatch/remove-meteor-nightwatch-runner.sh
pwd
#
ls -l
echo "
Is everything gone?"
echo "Will now remove rebuilder artifacts.  Hit <enter> when done."
read _
cd ..
rm -fr tryMNWRInst
rm -fr meteor-nightwatch-runner_bk

