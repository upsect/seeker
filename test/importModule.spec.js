const { expect, fancy } = require( 'fancy-test' );
const Seeker = require( './../lib' );


describe( 'import module', () => {
  fancy
    .add( 'module', Seeker.import({ module: [ 'foobar', 'os' ] }))
    .do( ctx => expect( ctx.module ).to.have.property( 'platform' ))
    .it( 'returns with the first module that resolves' );
  fancy
    .add( 'module', Seeker.import({ module: [ 'foobar', 'barfoo' ] }))
    .do( ctx => expect( ctx.module ).to.be.null )
    .it( 'returns null if all modules fail to resolve' );
});
