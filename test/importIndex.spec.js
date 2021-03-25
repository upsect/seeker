const { expect, fancy } = require( 'fancy-test' );
const Seeker = require( './../lib' );


describe( 'import index', () => {
  fancy
    .add( 'exports', Seeker.import({ index: `${process.cwd()}/test/fixtures/invalidDir` }))
    .do( ctx => expect( ctx.exports ).to.be.null )
    .it( 'returns null if no valid modules are found in directory' );
  fancy
    .add( 'exports', Seeker.import({ index: `${process.cwd()}/test/fixtures/emptyFiles` }))
    .do( ctx => expect( ctx.exports ).to.be.null )
    .it( 'returns null for non-cjs modules or undefined exports' );
  fancy
    .add( 'exports', Seeker.import({ index: `${process.cwd()}/test/fixtures/modules` }))
    .do( ctx => expect( ctx.exports.array ).to.be.a( 'array' ))
    .do( ctx => expect( ctx.exports.class ).to.be.a( 'function' ))
    .do( ctx => expect( ctx.exports.function ).to.be.a( 'function' ))
    .do( ctx => expect( ctx.exports.object ).to.be.a( 'object' ))
    .do( ctx => expect( ctx.exports.object.foo ).to.be.a( 'function' ))
    .do( ctx => expect( ctx.exports.object.bar ).to.be.a( 'function' ))
    .it( 'returns cjs modules with plain object and function exports' );
});
