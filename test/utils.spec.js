const { expect, fancy } = require( 'fancy-test' );
const Utils = require( './../lib/utils' );


class Foo { get () {} set () {} }
class Bar extends Foo { get () {} set () {} }


describe( 'utils', () => {
  describe( 'readDir', () => {
    fancy
      .add( 'dirents', Utils.readDir( `${process.cwd()}/test/fixtures/foobar` ))
      .do( ctx => expect( ctx.dirents ).to.be.null )
      .it( 'returns null if path throws an error' );
    fancy
      .add( 'dirents', Utils.readDir( `${process.cwd()}/test/fixtures/exampleModules` ))
      .do( ctx => expect( ctx.dirents ).to.be.a( 'array' ))
      .it( 'returns dirents if path contains files' );
  });

  describe( 'isClass', () => {
    fancy
      .do(() => expect( Utils.isClass( Foo )).to.be.true )
      .do(() => expect( Utils.isClass( Bar )).to.be.true )
      .it( 'returns true if function is a class' );
    fancy
      .do(() => expect( Utils.isClass( function () {})).to.be.false )
      .do(() => expect( Utils.isClass( function () { 'use strict'; })).to.be.false )
      .do(() => expect( Utils.isClass(() => {})).to.be.false )
      .do(() => expect( Utils.isClass({ hello: 'world' })).to.be.false )
      .it( 'returns false if function is not a class' );
  });
});
