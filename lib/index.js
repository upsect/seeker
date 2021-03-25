'use strict';

// --- Seeker imports

const ErrorFactory = require( './errorFactory' );
const ImportIndex = require( './importIndex' );
const ImportModule = require( './importModule' );


/**
 * @description Import module or index
 */
exports.import = function ( opts ) {
  return ErrorFactory( opts, ( error, type ) => {
    if ( error ) throw error;

    switch ( type ) {
      case 'module':
        return ImportModule( opts.module );
      case 'index':
        return ImportIndex( opts.index );
    }
  });
};
