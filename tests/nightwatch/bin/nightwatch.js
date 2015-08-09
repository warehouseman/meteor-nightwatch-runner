// child_process lets us exec and spawn external commands
const childProcess = require( "child_process" );

// request allows us to query external websites
const request = require( "request" );

// for _.extend()ing the process.env object
const _ = require( "underscore" );

// so we can read files from the filesystem
const fs = require( "fs-extra" );

// Use preconfigured Bunyan logger
const logger = require("./logger.js");

// Get locations of important artifacts
const constants = require("../config/constants.js");

//  This function collects an array all of the allowed command line options
//  ready for passing to NightWatch
function loadNightwatchArguments(options) {
  var nightwatchArguments = [];

  if ( options ) {
    if ( options.tags ) {
      nightwatchArguments.push( "--tag" );
      nightwatchArguments.push( options.tags );
    }
    if ( options.skiptags ) {
      nightwatchArguments.push( "--skiptags" );
      nightwatchArguments.push( options.skiptags );
    }

    if ( options.tinytests ) {
      nightwatchArguments.push( "--tag" );
      nightwatchArguments.push( "tinytests" );
    } else {
      nightwatchArguments.push( "--skiptags" );
      nightwatchArguments.push( "tinytests" );
    }

    if ( options.test ) {
      nightwatchArguments.push( "--test" );
      nightwatchArguments.push( options.test );
    }
    if ( options.verbose ) {
      nightwatchArguments.push( "--verbose" );
      nightwatchArguments.push( options.verbose );
    }
    if ( options.group ) {
      nightwatchArguments.push( "--group" );
      nightwatchArguments.push( options.group );
    }
    if ( options.filter ) {
      nightwatchArguments.push( "--filter" );
      nightwatchArguments.push( options.filter );
    }
    if ( options.env ) {
      nightwatchArguments.push( "--env" );
      nightwatchArguments.push( options.env );
    }
    if ( options.testcase ) {
      nightwatchArguments.push( "--testcase" );
      nightwatchArguments.push( options.testcase );
    }
    if ( options.config ) {
      nightwatchArguments.push( "-c" );
      nightwatchArguments.push( options.config );
    }
  }


  return nightwatchArguments;
}

// This is the Night Watch runner function
module.exports = function launchNightWatch( npmPrefix_, options_, port_, autoclose_ ) {
  var port = 3000;
  var autoclose = true;

  if ( port_ ) port = port_;
  if ( autoclose_ ) autoclose = autoclose_;

  logger.debug( "options", options_ );


  //  Connect to the Meteor application
  request( "http://localhost:" + port, function processRequest( error, httpResponse ) {
    var configFileLocation = constants.NIGHTWATCH_CONFIG;

    var nightwatchCommand = constants.NIGHTWATCH_COMMAND;

    var nightwatchExitCode = 0;

    if ( error ) {
      logger.fatal( error );
      logger.info( "No app is running on http://localhost:" + port + "/" );
      logger.info( "Try running an app in the background with 'meteor &'." );
      logger.info( "You can use 'fg' to return it to the foreground." );
      nightwatchExitCode = 2;
      // TODO: exit with error that will halt travis
      process.exit( 1 );
    }

    if ( httpResponse ) {
      logger.info( "Detected a meteor instance on port " + port );

      logger.info( "Launching nightwatch bridge..." );

      fs.readJson( configFileLocation, function processConfiguration( err, autoConfigObject ) {
        var nightwatchArguments;
        var nightwatchEnv;
        var nightwatch;

        if ( err ) {
          logger.fatal( "Cannot configure. '" + configFileLocation + "' could not be found." );
          process.exit( 1 );
        } else {
/*
          // now that we know our preferred config file
          // lets look for over-rides config files
          if ( process.env.TRAVIS ) {
            nightwatchCommand =
              "/home/travis/.nvm/v0.10.38/lib/node_modules/starrynight/node_modules/nightwatch/bin/nightwatch";
            configFileLocation = npmPrefix_ +
              "/lib/node_modules/starrynight/configs/nightwatch/travis.json";
          } else if ( process.env.NIGHTWATCH_CONFIG_PATH ) {
            configFileLocation = process.env.NIGHTWATCH_CONFIG_PATH;
          } else if ( process.env.FRAMEWORK_CONFIG_PATH ) {
            configFileLocation = process.env.FRAMEWORK_CONFIG_PATH;
          }
*/

          logger.debug( "configFileLocation", configFileLocation );
          logger.debug( "source folders : " + autoConfigObject.src_folders );

          if ( ! options_.config ) options_.config = configFileLocation;
          nightwatchArguments = loadNightwatchArguments(options_);

          nightwatchEnv = _.extend(
            process.env,
            {  npm_config_prefix: npmPrefix_  }
          );

          logger.debug( "npmPrefix:           ", npmPrefix_ );
          logger.debug( "nightwatchCommand:   ", nightwatchCommand );
          logger.debug( "configFileLocation:  ", configFileLocation );
          logger.debug( "nightwatchArguments: ", nightwatchArguments );


          nightwatch = childProcess.spawn(
            nightwatchCommand,
            nightwatchArguments,
            {  env: nightwatchEnv  }
          );

          nightwatch.stdout.on(
            "data",
            function onStdOut( data ) {
              logger.info( data.toString().trim() );

              // without this, travis CI won"t report that there are failed tests
              if ( data.toString().indexOf( "✖" ) > -1 ) {
                nightwatchExitCode = 1;
              }
            }
          );

          nightwatch.stderr.on(
            "data",
            function onStdErr( data ) {
              logger.error( data.toString() );
            }
          );

          nightwatch.on(
            "error",
            function onError( errNightWatch ) {
              logger.error(
                "[NightWatch] ERROR spawning nightwatch. Nightwatch command was",
                nightwatchCommand
              );
              logger.debug( "error", errNightWatch );
              throw error;
            }
          );

          nightwatch.on(
            "close",
            function onClose( exitCode ) {
              if ( exitCode === 0 ) {
                logger.info( "Finished!  Nightwatch ran all the tests!" );
                if ( autoclose ) {
                  process.exit( exitCode );
                }
              }
              if ( exitCode !== 0 ) {
                logger.debug( "Nightwatch exited with a code of " + exitCode );
                if ( autoclose ) {
                  process.exit( exitCode );
                }
              }
            }
          );
        }
      } );
    }

    return nightwatchExitCode;
  });
};

