'use strict';

// --- Node.js imports

const Path = require( 'path' );

// --- Seeker imports

const Utils = require( './utils' );


/**
 * @description Import whole directory
 */
module.exports = function ( path ) {
  const dirents = Utils.readDir( path );
  if ( !dirents ) return null;

  const index = {};

  for ( const ent of dirents ) {
    const absPath = Path.join( path, ent.name );

    const name = ent.name.split( '.' )[ 0 ];
    const exps = require( absPath );

    if ( Utils.isPlainObject( exps )) {
      const props = Object.getOwnPropertyNames( exps );
      if ( props.length ) {
        index[ name ] = {};
        props.forEach( prop => {
          index[ name ][ prop ] = exps[ prop ];
        });
      }
    }

    if ( Array.isArray( exps ) || Utils.isFunction( exps ) || Utils.isClass( exps )) {
      index[ `${name}` ] = exps;
    }
  }

  return Object.keys( index ).length ? index : null;
};
