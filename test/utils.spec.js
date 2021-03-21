const { expect, fancy } = require( 'fancy-test' );
const Utils = require( './../lib/utils' );


describe( 'utils', () => {
  describe( 'readDir', () => {
    fancy
      .add( 'dirents', Utils.readDir( `${process.cwd()}/test/fixtures/foobar` ))
      .do( ctx => expect( ctx.dirents ).to.be.null )
      .it( 'returns null if path throws an error' );
    fancy
      .add( 'dirents', Utils.readDir( `${process.cwd()}/test/fixtures/modules` ))
      .do( ctx => expect( ctx.dirents ).to.be.a( 'array' ))
      .it( 'returns dirents if path contains files' );
  });
});
