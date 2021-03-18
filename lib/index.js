'use strict';

// --- Node.js imports

const Fs = require( 'fs' );

// --- Vendor imports

const IsFunction = require( 'lodash.isfunction' );
const IsPlainObject = require( 'lodash.isplainobject' );

// --- Declare internals

const internals = {};

/**
 * @description Validate directory
 */
internals.is_directory = function ( path ) {
  try {
    const stat = Fs.lstatSync( path );
    return stat.isDirectory();
  } catch ( e ) {
    return false;
  }
};

/**
 * @description Read directory contents
 */
internals.read_dir = function ( path ) {
  Fs.readdir( path, ( error, files ) => {
    if ( error ) return null;
    return files;
  });
};

/**
 * @description Import single module
 */
internals.import_module = ( paths ) => {
  for ( const p of paths ) {
    if ( seeker.exists( p )) {
      return require( p );
    }
  }
  return null;
};

/**
 * @description Import whole directory
 */
internals.import_index = function ( path ) {
  const files = internals.read_dir( path );
  const index = {};

  for ( const f of files ) {
    if ( seeker.exists( f )) {
      const name = f.split( '.' )[ 0 ];
      const exps = require( f );
      if ( exps === null ) break;

      if ( IsPlainObject( exps )) {
        const props = Object.getOwnPropertyNames( exps );
        props.forEach( prop => { index[ name ][ prop ] = exps[ prop ]; });
      }

      if ( IsFunction( exps )) {
        index[ `${name}` ] = exps;
      }
    }
  }

  return index;
};

/**
 * @description Generate error
 */
internals.error = function ( message ) {
  const e = new Error();
  e.name = 'SeekerError';
  e.message = message;
  return e;
};

/**
 * @description Validate options
 */
internals.check_opts = function ( opts, cb ) {
  let error;

  if ( !opts.module && !opts.index ) {
    error = 'Expected one of `module` or `index` option';
  }
  if ( Object.keys( opts ).length > 1 ) {
    error = 'Please specify one of `module` or `index`';
  }
  if ( opts.index && typeof opts.index !== 'string' ) {
    error = 'Expected `index` to be of type `string`';
  }
  if ( opts.index && !internals.is_directory( opts.index )) {
    error = `Specified \`index\` ${opts.index} is not a directory`;
  }
  if ( opts.module && !Array.isArray( opts.module )) {
    error = 'Expected `module` to be of type `array`';
  }
  if ( opts.module && opts.module.length === 1 ) {
    error = `Expected \`module\` to contain multiple
    values. If you only need to import a single module, use
    the native \`require\` method provided by Node.js.`;
  }

  if ( error ) return cb( internals.error( error ));

  return cb( null, Object.keys( opts )[ 0 ]);
};

// --- Declare externals

const seeker = {};

/**
 * @description Check if module exists
 */
seeker.exists = function ( path ) {
  try {
    require.resolve( path );
  } catch ( e ) {
    return false;
  }
  return true;
};

/**
 * @description Import module or index
 */
seeker.import = function ( opts ) {
  internals.check_opts( opts, ( error, type ) => {
    if ( error ) throw error;

    if ( type === 'module' ) {
      return internals.import_module( opts.modules );
    }

    if ( type === 'index' ) {
      return internals.import_index( opts.index );
    }
  });
};

// --- Exports

module.exports = { seeker };
