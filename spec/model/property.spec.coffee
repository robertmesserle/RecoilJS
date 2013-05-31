describe 'Recoil.Property', ->

  it 'should exist', ->
    expect( Recoil.Property? ).toBe true

  it 'should allow creation without any data', ->
    prop = new Recoil.Property
    expect( prop? ).toBe( true )
    expect( prop instanceof Recoil.Property ).toBe( true )
    expect( prop.value ).toEqual( null )

  describe '#default', ->
    it 'should support default values', ->
      prop = new Recoil.Property default: 'default'
      expect( prop.default ).toBe( 'default' )
      expect( prop.value ).toBe( 'default' )
    it 'should allow setting of value', ->
      prop = new Recoil.Property default: 'default'
      prop.value = 'value'
      expect( prop.default ).toBe( 'default' )
      expect( prop.value ).toBe( 'value' )

  describe '#type', ->
    it 'should support setting type', ->
      prop = new Recoil.Property type: String
      expect( prop.type ).toBe( String )
    it 'should convert default to the specified type', ->
      prop = new Recoil.Property type: String, default: 0
      expect( prop.default ).toBe( '0' )
    it 'should convert value to the specified type', ->
      prop = new Recoil.Property type: String, value: 0
      expect( prop.value ).toBe( '0' )
    it 'should allow null values for boolean', ->
      prop = new Recoil.Property type: Boolean
      expect( prop.value ).toEqual( null )
