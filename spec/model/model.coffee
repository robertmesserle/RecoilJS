describe 'Recoil.Model', ->

  Person = new Recoil.Model( {
    $props:
      fname:  type: String, default: 'John', validate: ( ( value ) -> value.length )
      lname:  type: String, default: 'Doe',  validate: ( ( value ) -> value.length )
      age:    type: Number
      gender: type: Boolean, default: true
    $virtual:
      name:
        read: -> "#{ @fname } #{ @lname }"
        write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
      legal:
        read: -> @age >= 21
    $static:
      men:   -> for person in @instances when person.gender then person
      women: -> for person in @instances when not person.gender then person
  } )

  it 'should exist', ->
    expect( Recoil.Model? ).toBe true

  it 'should be stored in global models list', ->
    expect( Recoil.Model.models ).not.toBe( null )
    expect( Recoil.Model.models instanceof Array ).toBe( true )
    expect( Recoil.Model.models.length ).toBe( 1 )
    expect( Recoil.Model.models[ 0 ] ).toBe( Person )

  it 'should store instances in static property "instances"', ->
    expect( Person.instances? ).toBe( false )
    person = new Person
    expect( Person.instances? ).toBe( true )
    expect( Person.instances.length ).toBe( 1 )
    expect( Person.instances[ 0 ] ).toBe( person )

  it 'should work without any data', ->
    person = new Person
    expect( person? ).toBe true
    expect( person.fname ).toBe 'John'
    expect( person.lname ).toBe 'Doe'
    expect( person.age ).toBe( null )
    expect( person.gender ).toBe( true )

  it 'should support setting values', ->
    person = new Person fname: 'Robert', lname: 'Messerle', age: 23, gender: true
    expect( person.fname ).toBe 'Robert'
    expect( person.lname ).toBe 'Messerle'
    expect( person.age ).toBe 23
    expect( person.gender ).toBe true

  describe '#virtual', ->

    it 'should support reading virtuals', ->
      person = new Person
      expect( person.name() ).toBe( 'John Doe' )
      expect( person.legal() ).toBe( false )

      person.age = 21
      expect( person.legal() ).toBe( true )

    it 'should support writing to virtuals', ->
      person = new Person
      expect( person.name() ).toBe( 'John Doe' )
      person.name 'Jane Doe'
      expect( person.name() ).toBe( 'Jane Doe' )
      expect( person.fname ).toBe( 'Jane' )
      expect( person.lname ).toBe( 'Doe' )

    it 'should allow setting of virtuals in constructor', ->
      person = new Person name: 'Robert Messerle'
      expect( person.name() ).toBe( 'Robert Messerle' )
      expect( person.fname ).toBe( 'Robert' )
      expect( person.lname ).toBe( 'Messerle' )

  describe '#save, #revert', ->

    it 'should support reverting', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 23, gender: true
      person.fname = 'John'
      person.lname = 'Doe'
      person.age = 18
      person.gender = false
      person.revert()
      expect( person.name() ).toBe( 'Robert Messerle' )
      expect( person.age ).toBe( 23 )
      expect( person.gender ).toBe( true )

    it 'should support saving', ->
      person = new Person
      expect( person.name() ).toBe( 'John Doe' )
      expect( person.age ).toBe( null )
      expect( person.gender ).toBe( true )
      
      person.fname    = 'Jane'
      person.age      = 18
      person.gender   = false

      expect( person.name() ).toBe( 'Jane Doe' )
      expect( person.age ).toBe( 18 )
      expect( person.gender ).toBe( false )
      
      person.save()
      person.revert()

      expect( person.name() ).toBe( 'Jane Doe' )
      expect( person.age ).toBe( 18 )
      expect( person.gender ).toBe( false )

    describe '#validate', ->

      it 'should decline invalid entries', ->
        person = new Person
        person.fname = ''
        person.lname = ''
        person.save()
        person.revert()
        expect( person.fname ).toBe 'John'
        expect( person.lname ).toBe 'Doe'

  describe '$static', ->

    it 'should support statics', ->
      expect( Person.men ).not.toBe( null )
      expect( Person.men() instanceof Array ).toBe( true )
      expect( Person.women() instanceof Array ).toBe( true )
      expect( Person.men()[ 0 ].gender ).toBe( true )
      expect( Person.women()[ 0 ].gender ).toBe( false )


