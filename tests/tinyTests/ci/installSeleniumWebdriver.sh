#!/bin/bash
#
sudo add-apt-repository -y ppa:ubuntu-toolchain-r/test;
sudo apt-get update;
sudo apt-get install gcc-4.8 g++-4.8;
sudo apt-get autoremove;
sudo update-alternatives --remove-all gcc:
sudo update-alternatives --remove-all g++;
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 20;
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 20;
sudo update-alternatives --config gcc;
sudo update-alternatives --config g++;

g++ --version;
gcc --version;
npm install --prefix ${HOME} selenium-webdriver; 