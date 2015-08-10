exports.NIGHTWATCH_PATH             = "./tests/nightwatch";

exports.NIGHTWATCH_BIN_DIR          = exports.NIGHTWATCH_PATH + "/bin";
exports.NIGHTWATCH_LOGS_DIR         = exports.NIGHTWATCH_PATH + "/logs";
exports.NIGHTWATCH_CONFIG_DIR       = exports.NIGHTWATCH_PATH + "/config";
exports.NIGHTWATCH_MODULES_DIR      = exports.NIGHTWATCH_PATH + "/node_modules";
exports.NIGHTWATCH_WALKTHROUGHS_DIR = exports.NIGHTWATCH_PATH + "/walkthroughs";

exports.NIGHTWATCH_CONFIG_FILE      = exports.NIGHTWATCH_CONFIG_DIR + "/nightwatch.json";


exports.SELENIUM_LOG                = "selenium-debug.log";
exports.SELENIUM_LOG_PATH           = exports.NIGHTWATCH_LOGS_DIR + "/" + exports.SELENIUM_LOG;

exports.SELENIUM_DRIVER_JAR         = "selenium-server-standalone-2.47.1.jar";
exports.SELENIUM_DRIVER_PATH        = exports.NIGHTWATCH_MODULES_DIR + "/" + exports.SELENIUM_DRIVER_JAR;

exports.NIGHTWATCH_CONFIG           = exports.NIGHTWATCH_CONFIG_DIR + "/nightwatch.json";
exports.NIGHTWATCH_MODULE_DIR       = exports.NIGHTWATCH_MODULES_DIR + "/nightwatch";
exports.NIGHTWATCH_COMMAND          = exports.NIGHTWATCH_MODULE_DIR + "/bin/nightwatch";

exports.DEPENDENCY_INSTALLER        = exports.NIGHTWATCH_BIN_DIR + "/install-nightwatch-dependencies.sh";
