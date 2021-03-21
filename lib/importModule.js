'use strict';

// --- Seeker imports

const Utils = require( './utils' );


/**
 * @description Import single module
 */
module.exports = ( paths ) => {
  for ( const p of paths ) {
    if ( Utils.isModule( p )) {
      return require( p );
    }
  }
  return null;
};
