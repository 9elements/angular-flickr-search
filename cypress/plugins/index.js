const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');

// Plugins taken from
// https://github.com/briebug/cypress-schematic/tree/master/src/schematics/cypress/files/cypress/plugins
// MIT License – Copyright (c) 2020 BrieBug Software

module.exports = (on) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
};
