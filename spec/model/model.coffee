describe 'Recoil.Model', ->

  performTests = ( Person ) ->

    it 'should exist', ->
      expect( Recoil.Model? ).toBe true

    it 'should work without any data', ->
      person = new Person
      expect( person? ).toBe true
      expect( person.fname ).toBe 'John'
      expect( person.lname ).toBe 'Doe'
      expect( person.age ).toBe( null )
      expect( person.gender ).toBe( true )

    it 'should support functions', ->
      person = new Person
      expect( person.getFullName() ).toBe( 'John Doe' )

  describe 'CoffeeScript Syntax', ->

    class Person extends Recoil.Model
      fname:  @property type: String, default: 'John'
      lname:  @property type: String, default: 'Doe'
      age:    @property type: Number
      gender: @property type: Boolean, default: true

      getFullName: -> "#{ @fname } #{ @lname }"

    performTests( Person )

  describe 'JavaScript Syntax', ->

    Person = Recoil.createModel( {
      fname: Recoil.createProperty type: String, default: 'John'
      lname: Recoil.createProperty type: String, default: 'Doe'
      age:   Recoil.createProperty type: Number
      gender:Recoil.createProperty type: Boolean, default: true
      getFullName: -> "#{ @fname } #{ @lname }"
    } )

    performTests( Person )