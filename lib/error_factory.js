'use strict';

// --- Seeker imports

const Utils = require( './utils' );

// --- Declare internals

const internals = {};


/**
 * @description Generate error message
 */
internals.error_factory = function ( opts ) {
  if ( !opts.module && !opts.index ) {
    return 'Expected one of `module` or `index` option';
  }
  if ( Object.keys( opts ).length > 1 ) {
    return 'Please specify one of `module` or `index`';
  }
  if ( opts.index && typeof opts.index !== 'string' ) {
    return 'Expected `index` to be of type `string`';
  }
  if ( opts.index && !Utils.is_directory( opts.index )) {
    return `Specified \`index\` '${opts.index}' is not a directory`;
  }
  if ( opts.module && !Array.isArray( opts.module )) {
    return 'Expected `module` to be of type `array`';
  }
  if ( opts.module && opts.module.length === 1 ) {
    return 'Expected `module` to contain multiple values. If you only need to import a single module, use the native `require` method provided by Node.js';
  }
  return null;
};

/**
 * @description Validate options
 */
module.exports = function ( opts, cb ) {
  const error = internals.error_factory( opts );
  if ( error ) return cb( new Error( error ));
  return cb( null, Object.keys( opts )[ 0 ]);
};
