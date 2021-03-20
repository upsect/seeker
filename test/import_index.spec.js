const { expect, fancy } = require( 'fancy-test' );
const Seeker = require( './../lib' );


describe( 'import index', () => {
  fancy
    .add( 'exports', Seeker.import({ index: `${process.cwd()}/test/modules` }))
    .do( ctx => expect( ctx.exports.empty ).to.be.undefined )
    .it( 'does not return modules with non-cjs or undefined exports' );
  fancy
    .add( 'exports', Seeker.import({ index: `${process.cwd()}/test/modules` }))
    .do( ctx => expect( ctx.exports.object ).to.be.a( 'object' ))
    .do( ctx => expect( ctx.exports.object.foo ).to.be.a( 'function' ))
    .do( ctx => expect( ctx.exports.object.bar ).to.be.a( 'function' ))
    .do( ctx => expect( ctx.exports.function ).to.be.a( 'function' ))
    .it( 'returns cjs modules with plain object exports' );
});
