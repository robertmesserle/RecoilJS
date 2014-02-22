{ expect } = require '../setup.coffee'
Property   = require '../../src/model/property.coffee'

describe 'Property', ->
  it 'should exist', -> expect( Property? ).to.be true
  it 'should allow creation without any data', ->
    prop = new Property
    expect( prop? ).to.be true
    expect( prop ).to.be.a Property
    expect( prop.value ).to.eql null
  describe '#default', ->
    it 'should support default values', ->
      prop = new Property default: 'default'
      expect( prop.default ).to.be 'default'
      expect( prop.value ).to.be 'default'
    it 'should allow setting of value', ->
      prop = new Property default: 'default'
      prop.value = 'value'
      expect( prop.default ).to.be 'default'
      expect( prop.value ).to.be 'value'
  describe '#type', ->
    it 'should support setting type', ->
      prop = new Property type: String
      expect( prop.type ).to.be String
    it 'should convert default to the specified type', ->
      prop = new Property type: String, default: 0
      expect( prop.default ).to.be '0'
      expect( prop.value ).to.be '0'
    it 'should allow null values for boolean', ->
      prop = new Property type: Boolean
      expect( prop.value ).to.eql null
