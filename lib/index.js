'use strict';

// --- Seeker imports

const ErrorFactory = require( './error_factory' );
const ImportIndex = require( './import_index' );
const ImportModule = require( './import_module' );


/**
 * @description Import module or index
 */
exports.import = function ( opts ) {
  return ErrorFactory( opts, ( error, type ) => {
    if ( error ) throw error;

    if ( type === 'module' ) {
      return ImportModule( opts.module );
    }

    if ( type === 'index' ) {
      return ImportIndex( opts.index );
    }
  });
};
