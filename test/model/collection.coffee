{ expect } = require( '../setup.coffee' )
Collection = require( '../../src/model/collection.coffee' )

describe( 'Collection', ->
  it( 'should exist', -> expect( Collection ).to.be.ok() )
  it( 'should allow saving', ->
    numbers = new Collection()
    numbers.value = [ 1, 2, 3 ]
    expect( numbers.value ).not.to.be( numbers.savedValue )
    expect( numbers.value ).not.to.eql( numbers.savedValue )
    numbers.save()
    expect( numbers.value ).not.to.be( numbers.savedValue )
    expect( numbers.value ).to.eql( numbers.savedValue )
  )
  it( 'should allow reverting', ->
    numbers = new Collection()
    numbers.value = [ 1, 2, 3 ]
    numbers.save()
    numbers.value.push( 4 )
    expect( numbers.value ).not.to.eql( numbers.savedValue )
    numbers.revert()
    expect( numbers.value ).not.to.be( numbers.savedValue )
    expect( numbers.value ).to.eql( numbers.savedValue )
  )
  describe( 'native array methods', ->
    numbers = new Collection()
    it( 'should support push', ->
      expect( numbers.push ).to.be.ok()
      expect( typeof numbers.push ).to.be( 'function' )
      numbers.push( 1 )
      expect( numbers.value ).to.eql( [ 1 ] )
    )
    it( 'should support indexOf', -> expect( numbers.indexOf( 1 ) ).to.be( 0 ) )
    it( 'should support pop', ->
      expect( numbers.pop() ).to.be( 1 )
      expect( numbers.value ).to.eql( [] )
    )
  )
  describe( 'helper methods', ->
    numbers = new Collection()
    it( 'should support find', ->
      numbers.value = [ 1, 2, 3, 4, 5 ]
      expect( numbers.find( 3 ) ).to.be( 3 )
      expect( numbers.find( 7 ) ).to.be( undefined )
      expect( numbers.find( ( val ) -> val is 3 ) ).to.be( 3 )
      expect( numbers.find( ( val ) -> val is 7 ) ).to.be( undefined )
    )
  )
)
