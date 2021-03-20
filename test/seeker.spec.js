const { expect, fancy } = require( 'fancy-test' );
const { seeker } = require( '../lib' );

describe( 'module exists', () => {
  fancy
    .add( 'module', seeker.exists( 'mocha' ))
    .it( 'returns true if the module is resolvable', ctx => {
      return expect( ctx.module ).to.be.true;
    });
  fancy
    .add( 'module', seeker.exists( 'foobar' ))
    .it( 'returns false if module is not resolvable', ctx => {
      return expect( ctx.module ).to.be.false;
    });
});

describe( 'import module', () => {
  fancy
    .add( 'module', seeker.import({ module: [ 'foobar', 'os' ] }))
    .do( ctx => expect( ctx.module ).to.have.property( 'platform' ))
    .it( 'returns with the first module that resolves' );
  fancy
    .add( 'module', seeker.import({ module: [ 'foobar', 'barfoo' ] }))
    .do( ctx => expect( ctx.module ).to.be.null )
    .it( 'returns null if all modules fail to resolve' );
});

describe( 'import options', () => {
  fancy
    .do(() => seeker.import({ nodule: [ 'foobar', 'barfoo' ] }))
    .catch( 'Expected one of `module` or `index` option' )
    .it( 'throws an error when invalid option is passed' );
  fancy
    .do(() => seeker.import({ module: [ 'foobar', 'barfoo' ], index: './raboof' }))
    .catch( 'Please specify one of `module` or `index`' )
    .it( 'throws an error when too many options are passed' );
});
