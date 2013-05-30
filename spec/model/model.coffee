describe 'Recoil.Model', ->

  Person = new Recoil.Model( {
    $props:
      fname:  type: String, default: 'John'
      lname:  type: String, default: 'Doe'
      age:    type: Number
      gender: type: Boolean, default: true
    getFullName: -> "#{ @fname } #{ @lname }"
  } )

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

  it 'should support setting values', ->
    person = new Person fname: 'Robert', lname: 'Messerle', age: 23, gender: true
    expect( person.getFullName() ).toBe( 'Robert Messerle' )
    expect( person.age ).toBe( 23 )
    expect( person.gender ).toBe( true )

  it 'should support reverting', ->
    person = new Person fname: 'Robert', lname: 'Messerle', age: 23, gender: true
    person.fname = 'John'
    person.lname = 'Doe'
    person.age = 18
    person.gender = false
    person.revert()
    expect( person.getFullName() ).toBe( 'Robert Messerle' )
    expect( person.age ).toBe( 23 )
    expect( person.gender ).toBe( true )

  it 'should support saving', ->
    person = new Person
    expect( person.getFullName() ).toBe( 'John Doe' )
    expect( person.age ).toBe( null )
    expect( person.gender ).toBe( true )
    # Overwrite values
    person.fname = 'Jane'
    person.age = 18
    person.gender = false
    expect( person.getFullName() ).toBe( 'Jane Doe' )
    expect( person.age ).toBe( 18 )
    expect( person.gender ).toBe( false )
    # Save, then revert - revert should not do anything
    person.save()
    person.revert()
    expect( person.getFullName() ).toBe( 'Jane Doe' )
    expect( person.age ).toBe( 18 )
    expect( person.gender ).toBe( false )