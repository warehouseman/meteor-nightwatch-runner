#!/usr/bin/env node
// Get script that does all the work
const runNightwatch = require("./bin/nightwatch.js");

// Use touch to ensure needed files exist
const touch = require("touch");
// Use mkdirp to ensure needed directories exist
const mkdirp = require("mkdirp");
// Use logger to ensure central instantiation of Bunyan logging
const logger = require("./bin/logger.js");

// so we can get the npm install prefix
const npm = require( "npm" );
// minimist lets us cleanly parse our cli arguments into an object
const minimist = require( "minimist" );

// Prepare Selenium's target logging directory and file
const LOG_DIR = "./tests/nightwatch/logs";
const SELENIUM_LOG = "selenium-debug.log";
const SELENIUM_PATH = LOG_DIR + "/" + SELENIUM_LOG;

// Collect our comman line parameters
var options = minimist( process.argv );

// Set logging level to "info", but ...
logger.level("info");

// ... if log level set by caller use that instead
options.log && logger.level(options.log);

mkdirp(LOG_DIR, function confirmDir(errMkDir) {
  if (errMkDir) {
    logger.fatal( "Cannot continue. Logs directory '" + LOG_DIR + "' could not be created." );
    process.exit( 1 );
  }
  touch(SELENIUM_PATH, function confirmFile(errTouch) {
    if (errTouch) {
      logger.fatal( "Cannot continue. Selenium log file '" + SELENIUM_LOG + "' could not be created." );
      process.exit( 1 );
    }
  });
});

/*    Looks like we can run NightWatch now  */
npm.load(
  function loadRunner( error, envNpm ) {
    var npmPrefix;

    if ( error ) {
      throw error;
    }

    npmPrefix = envNpm.config.get( "prefix" );

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
