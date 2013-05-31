describe 'Recoil.Model', ->

  describe 'Core Functionality', ->

    Person = new Recoil.Model( {
      $props:
        fname:  default: 'John'
        lname:  default: 'Doe'
        age:    {}
    } )

    it 'should exist', ->
      expect( Recoil.Model ).not.toBe null

    it 'should be stored in global models list', ->
      expect( Recoil.Model.models ).not.toEqual null
      expect( Recoil.Model.models instanceof Array ).toBe( true )
      expect( Recoil.Model.models.length ).toBeGreaterThan( 0 )
      expect( Recoil.Model.models[ 0 ] ).toBe( Person )

    it 'should store items in static property "items"', ->
      expect( Person.items ).toEqual []
      person = new Person
      expect( Person.items ).not.toEqual null
      expect( Person.items.length ).toBe( 1 )
      expect( Person.items[ 0 ] ).toBe( person )

    it 'should work without any data', ->
      person = new Person
      expect( person ).not.toEqual null
      expect( person.fname ).toBe 'John'
      expect( person.lname ).toBe 'Doe'
      expect( person.age ).toEqual null

    it 'should support setting values', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 23, gender: true
      expect( person.fname ).toBe 'Robert'
      expect( person.lname ).toBe 'Messerle'
      expect( person.age ).toBe 23
      expect( person.gender ).toBe true

  describe '#set', ->

    Person = new Recoil.Model( {
      $props:
        fname:  default: 'John'
        lname:  default: 'Doe'
      $virtual:
        name:
          read: -> "#{ @fname } #{ @lname }"
          write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
    } )

    it 'should support setting a property value', ->
      person = new Person
      person.set 'fname', 'Jane'
      expect( person.name ).toBe 'Jane Doe'
      expect( person.fname ).toBe 'Jane'

    it 'should support setting multiple properties at once', ->
      person = new Person
      expect( person.name ).toBe 'John Doe'
      person.set fname: 'Foo', lname: 'Bar'
      expect( person.fname ).toBe 'Foo'
      expect( person.lname ).toBe 'Bar'
      expect( person.name ).toBe 'Foo Bar'

  describe '#virtual', ->

    Person = new Recoil.Model( {
      $props:
        fname:  default: 'John'
        lname:  default: 'Doe'
        age:    {}
      $virtual:
        name:
          read: -> "#{ @fname } #{ @lname }"
          write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
        legal:
          read: -> @age > 20
    } )

    it 'should support reading virtuals', ->
      person = new Person
      expect( person.name ).toBe( 'John Doe' )
      expect( person.legal ).toBe( false )

      person.set 'age', 21
      expect( person.legal ).toBe( true )

    it 'should support writing to virtuals', ->
      person = new Person
      expect( person.name ).toBe( 'John Doe' )
      person.set 'name', 'Jane Doe'
      expect( person.name ).toBe( 'Jane Doe' )
      expect( person.fname ).toBe( 'Jane' )
      expect( person.lname ).toBe( 'Doe' )

    it 'should allow setting of virtuals in constructor', ->
      person = new Person name: 'Robert Messerle'
      expect( person.name ).toBe( 'Robert Messerle' )
      expect( person.fname ).toBe( 'Robert' )
      expect( person.lname ).toBe( 'Messerle' )

  describe '#save, #revert', ->

    Person = new Recoil.Model( {
      $props:
        fname:  type: String, default: 'John'
        lname:  type: String, default: 'Doe'
        age:    type: Number
        gender: type: Boolean, default: true
      $virtual:
        name:
          read: -> "#{ @fname } #{ @lname }"
          write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
        legal:
          read: -> @age >= 21
    } )

    it 'should support reverting', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 23, gender: true
      person.fname = 'John'
      person.lname = 'Doe'
      person.age = 18
      person.gender = false
      person.revert()
      expect( person.name ).toBe( 'Robert Messerle' )
      expect( person.age ).toBe( 23 )
      expect( person.gender ).toBe( true )

    it 'should support saving', ->
      person = new Person
      expect( person.name ).toBe( 'John Doe' )
      expect( person.age ).toBe( null )
      expect( person.gender ).toBe( true )
      
      person.fname    = 'Jane'
      person.age      = 18
      person.gender   = false
      person.update()

      expect( person.name ).toBe( 'Jane Doe' )
      expect( person.age ).toBe( 18 )
      expect( person.gender ).toBe( false )
      
      person.save()
      person.revert()

      expect( person.name ).toBe( 'Jane Doe' )
      expect( person.age ).toBe( 18 )
      expect( person.gender ).toBe( false )

  describe '$static', ->

    Person = new Recoil.Model( {
      $props:
        fname:  type: String, default: 'John'
        lname:  type: String, default: 'Doe'
        gender: type: Boolean, default: true
      $static:
        men:   -> for person in @items when person.gender then person
        women: -> for person in @items when not person.gender then person
    } )

    new Person
    new Person gender: false

    it 'should support statics', ->
      expect( Person.men ).not.toEqual null
      expect( Person.men() instanceof Array ).toBe( true )
      expect( Person.women() instanceof Array ).toBe( true )
      expect( Person.men()[ 0 ].gender ).toBe( true )
      expect( Person.women()[ 0 ].gender ).toBe( false )

  describe '#validate', ->

    runTests = ( Person ) ->

      it 'should reject an empty name', ->
        person = new Person name: 'John Doe'
        expect( person.name ).toBe 'John Doe'
        person.set name: ''
        person.save()
        person.revert()
        expect( person.name ).toBe 'John Doe'

    describe 'As $validate property', ->
      runTests new Recoil.Model {
        $props:
          name: type: String
        $validate:
          name: ( value ) -> value?.length
      }

    describe 'As property option', ->
      runTests new Recoil.Model {
        $props:
          name:
            type: String
            validate: ( value ) -> value?.length
      }

  describe '#subscribe', ->

    catches = null

    runTests = ( Person ) ->

      it 'should not catch the initial load', ->
        catches = []
        person = new Person name: 'John Doe'
        expect( catches ).toEqual []

      it 'should catch an update post-init', ->
        catches = []
        person = new Person name: 'John Doe'
        person.set name: 'Jane Doe'
        expect( catches.length ).toBe 1
        expect( catches[ 0 ] ).toBeDefined()
        expect( catches[ 0 ].value ).toBe 'Jane Doe'
        expect( catches[ 0 ].oldValue ).toBe 'John Doe'

    describe 'As property option', ->
      runTests new Recoil.Model {
        $props:
          name: type: String, subscribe: ( value, oldValue ) ->
            catches.push value: value, oldValue: oldValue
      }

    describe 'As $subscribe property', ->
      runTests new Recoil.Model {
        $props:
          name: type: String
        $subscribe:
          name: ( value, oldValue ) ->
            catches.push value: value, oldValue: oldValue
      }
