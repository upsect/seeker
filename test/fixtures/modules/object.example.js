/**
 * @description Example of exporting an object.
 * Using the seeker `index` option, this file
 * would be returned as:
 *
 * { 'object': { 'foo': fn, 'bar': fn } }
 */
module.exports = {
  foo: () => 'bar',
  bar: () => 'foo'
};
