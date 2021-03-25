'use strict';

// --- Node.js imports

const Fs = require( 'fs' );


/**
 * @description Read directory contents
 */
exports.readDir = function ( path ) {
  try {
    return Fs.readdirSync( path, { withFileTypes: true });
  } catch ( e ) {
    return null;
  }
};

/**
 * @description Validate directory
 */
exports.isDirectory = function ( path ) {
  try {
    const stat = Fs.lstatSync( path );
    return stat.isDirectory();
  } catch ( e ) {
    return false;
  }
};

/**
 * @description Validate filename
 */
exports.isValid = function ( name ) {
  const isDotFile = name.indexOf( '.' ) === 0;
  const isIndex = name === 'index.js';
  if ( isDotFile || isIndex ) return false;
  return true;
};

/**
 * @description Check if module exists
 */
exports.isModule = function ( path ) {
  try {
    require.resolve( path );
  } catch ( e ) {
    return false;
  }
  return true;
};

/**
 * @description Check if `exps` is a class
 */
exports.isClass = function ( exps ) {
  // Class constructor is also a function
  if ( !( exps && exps.constructor === Function ) || exps.prototype === undefined ) {
    return false;
  }
  // This is a class that extends other class
  if ( Function.prototype !== Object.getPrototypeOf( exps )) {
    return true;
  }
  // Usually a function will only have 'constructor' in the prototype
  return Object.getOwnPropertyNames( exps.prototype ).length > 1;
};
