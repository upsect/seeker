'use strict';

// --- Node.js imports

const Path = require( 'path' );

// --- Vendor imports

const IsFunction = require( 'lodash.isfunction' );
const IsPlainObject = require( 'lodash.isplainobject' );

// --- Seeker imports

const Utils = require( './utils' );


/**
 * @description Import whole directory
 */
module.exports = function ( path ) {
  const dirents = Utils.readDir( path );
  const index = {};

  for ( const ent of dirents ) {
    const absPath = Path.join( path, ent.name );

    if ( !Utils.isValid( ent.name ) || !Utils.isModule( absPath )) break;

    const name = ent.name.split( '.' )[ 0 ];
    const exps = require( absPath );

    if ( IsPlainObject( exps )) {
      const props = Object.getOwnPropertyNames( exps );
      if ( props.length ) {
        index[ name ] = {};
        props.forEach( prop => {
          index[ name ][ prop ] = exps[ prop ];
        });
      }
    }

    if ( Array.isArray( exps ) || IsFunction( exps ) || Utils.isClass( exps )) {
      index[ `${name}` ] = exps;
    }
  }

  return Object.keys( index ).length ? index : null;
};
