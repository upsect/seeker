'use strict';

// --- Node.js imports

const Fs = require( 'fs' );


/**
 * @description Read directory contents
 */
exports.read_dir = function ( path ) {
  return Fs.readdirSync( path, { withFileTypes: true }, ( error, dirents ) => {
    if ( error ) return null;
    return dirents;
  });
};

/**
 * @description Validate directory
 */
exports.is_directory = function ( path ) {
  try {
    const stat = Fs.lstatSync( path );
    return stat.isDirectory();
  } catch ( e ) {
    return false;
  }
};

/**
 * @description Check if module exists
 */
exports.exists = function ( path ) {
  try {
    require.resolve( path );
  } catch ( e ) {
    return false;
  }
  return true;
};
