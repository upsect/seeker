const { fancy } = require( 'fancy-test' );
const Seeker = require( './../lib' );


describe( 'import options', () => {
  fancy
    .do(() => Seeker.import({ nodule: [ 'foobar', 'barfoo' ] }))
    .catch( 'Expected one of `module` or `index` option' )
    .it( 'throws an error when invalid option is passed' );
  fancy
    .do(() => Seeker.import({ module: [ 'foobar', 'barfoo' ], index: './raboof' }))
    .catch( 'Please specify one of `module` or `index`' )
    .it( 'throws an error when too many options are passed' );
  fancy
    .do(() => Seeker.import({ index: [ 'foobar' ] }))
    .catch( 'Expected `index` to be of type `string`' )
    .it( 'throws an error when `index` type is invalid' );
  fancy
    .do(() => Seeker.import({ index: `${process.cwd()}/test/foobar` }))
    .catch( `Specified \`index\` '${process.cwd()}/test/foobar' is not a directory` )
    .it( 'throws an error when `index` is not a directory' );
  fancy
    .do(() => Seeker.import({ module: 'foobar' }))
    .catch( 'Expected `module` to be of type `array`' )
    .it( 'throws an error when `module` type is invalid' );
  fancy
    .do(() => Seeker.import({ module: [ 'foobar' ] }))
    .catch( 'Use Node.js `require` to import single modules' )
    .it( 'throws an error when only one `module` is specified' );
});
