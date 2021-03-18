const { expect, fancy } = require( 'fancy-test' );
const { seek } = require( '../lib' );

describe( 'exists', () => {
  fancy
    .add( 'module', seek.exists( 'mocha' ))
    .it( 'returns true if the module is resolvable', ctx => {
      return expect( ctx.module ).to.be.true;
    });
  fancy
    .add( 'module', seek.exists( 'foobar' ))
    .it( 'returns false if module is not resolvable', ctx => {
      return expect( ctx.module ).to.be.false;
    });
});

describe( 'import', () => {
  fancy
    .add( 'module', seek.import( 'foobar', 'os' ))
    .it( 'returns with the first module that resolves', ctx => {
      return expect( ctx.module ).to.have.property( 'platform' );
    });
  fancy
    .add( 'module', seek.import( 'foobar', 'barfoo' ))
    .it( 'returns null if all modules fail to resolve', ctx => {
      return expect( ctx.module ).to.be.null;
    });
});
