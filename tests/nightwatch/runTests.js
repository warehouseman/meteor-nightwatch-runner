#!/usr/bin/env node
// require('nightwatch/bin/runner.js');
const path = require('path');
const fs = require('fs');
const recursive = require('recursive-readdir');
const runNightwatch = require('./bin/nightwatch.js');

const logger = require('./bin/logger.js');

// so we can get the npm install prefix
const npm = require( "npm" );
// minimist lets us cleanly parse our cli arguments into an object
const minimist = require( "minimist" );

var options = minimist( process.argv );

logger.level("info");

options.log && logger.level(options.log);

npm.load(
  function ( error, npm ) {
    if ( error ) {
      throw error;
    }
    var npmPrefix = npm.config.get( "prefix" );

    logger.debug( "npm prefix is", npmPrefix );

//    findNightWatchTestFiles();

    runNightwatch(npmPrefix, options);

  }
);

/*
String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

function findNightWatchTestFiles() {

  recursive('.', function (err, files) {
    // 'files' is an array of filenames
    var selected = [];
    files.forEach(
      function selectFiles(element, index, array) {
        var pathFile = element.split(path.sep);
        if ( [".meteor", ".git"].indexOf(pathFile[0]) < 0 ) {
          var nameFile = pathFile.pop()
          console.log('a[' + index + '] = ' + nameFile);
          if ( nameFile.endsWith(".js") ) {
            var file = element;

            var data = fs.readFileSync(element);
            if(data.toString().indexOf("NightWatch") > -1) {
              console.log (  element + " is a NightWatch file");
              selected.push(element);
            }
          }
        }
      }
    );

    console.log("~~~~~~~~");
    console.log(selected);
  });
}
*/