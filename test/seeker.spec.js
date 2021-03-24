const { expect, fancy } = require('fancy-test')
const seeker = require('../lib')

describe('exists', () => {
  fancy
    .add('module', seeker.exists('mocha'))
    .it('returns true if the module is resolvable', ctx => {
      expect(ctx.module).to.be.true
    })
  fancy
    .add('module', seeker.exists('foobar'))
    .it('returns false if module is not resolvable', ctx => {
      expect(ctx.module).to.be.false
    })
})

describe('import', () => {
  fancy
    .add('module', seeker.import('foobar', 'os'))
    .it('returns with the first module that resolves', ctx => {
      expect(ctx.module).to.have.property('platform')
    })
  fancy
    .add('module', seeker.import('foobar', 'barfoo'))
    .it('returns null if all modules fail to resolve', ctx => {
      expect(ctx.module).to.be.null
    })
})
