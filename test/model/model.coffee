{ expect } = require '../setup.coffee'
Property   = require '../../src/model/property.coffee'
Model      = require '../../src/model/model.coffee'

describe 'Model', ->
  describe 'core functionality', ->
    Person = new Model {
      $props:
        fname: default: 'John'
        lname: default: 'Doe'
        age:   {}
    }
    it 'should exist', -> expect( Model ).to.be.ok()
    it 'should be stored in global models list', ->
      expect( Model.models ).to.be.ok()
      expect( Model.models ).to.be.an Array
      expect( Model.models.length ).to.be.above 0
      expect( Model.models[ 0 ] ).to.be Person
    it 'should store items in static property "items"', ->
      expect( Person.items ).to.eql []
      person = new Person()
      expect( Person.items ).not.to.be.empty()
      expect( Person.items.length ).to.be 1
      expect( Person.items[ 0 ] ).to.be person
    it 'should work without any data', ->
      person = new Person()
      expect( person ).to.be.ok()
      expect( person.fname ).to.be 'John'
      expect( person.lname ).to.be 'Doe'
      expect( person.age ).to.eql null
    it 'should support setting values', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28, gender: true
      expect( person.fname ).to.be 'Robert'
      expect( person.lname ).to.be 'Messerle'
      expect( person.age ).to.be 28
  describe '#set', ->
    Person = new Model {
      $props:
        fname:   default: 'John'
        lname:   default: 'Doe'
      $virtual:
        name:
          read:  -> "#{ @fname } #{ @lname }"
          write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
    }
    it 'should support setting a property value', ->
      person = new Person()
      person.set fname: 'Jane'
      expect( person.name ).to.be 'Jane Doe'
      expect( person.fname ).to.be 'Jane'
    it 'should support setting multiple properties at once', ->
      person = new Person()
      expect( person.name ).to.be 'John Doe'
      person.set fname: 'Foo', lname: 'Bar'
      expect( person.fname ).to.be 'Foo'
      expect( person.lname ).to.be 'Bar'
      expect( person.name ).to.be 'Foo Bar'
  describe '#virtual', ->
    Person = new Model {
      $props:
        fname:   default: 'John'
        lname:   default: 'Doe'
        age:     {}
      $virtual:
        name:
          read:  -> "#{ @fname } #{ @lname }"
          write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
        adult:   read:    -> @age > 18
    }
    it 'should support reading virtuals', ->
      person = new Person()
      expect( person.name ).to.be 'John Doe'
      expect( person.adult ).to.be false
      person.set age: 21
      expect( person.adult ).to.be true
    it 'should support writing to virtuals', ->
      person = new Person()
      expect( person.name ).to.be 'John Doe'
      person.set 'name', 'Jane Doe'
      expect( person.name ).to.be 'Jane Doe'
      expect( person.fname ).to.be 'Jane'
      expect( person.lname ).to.be 'Doe'
    it 'should allow setting of virtuals in constructor', ->
      person = new Person name: 'Robert Messerle'
      expect( person.name ).to.be 'Robert Messerle'
      expect( person.fname ).to.be 'Robert'
      expect( person.lname ).to.be 'Messerle'
  describe '#save, #recert', ->
    Person = new Model {
      $props:
        fname:   type: String,  default: 'John'
        lname:   type: String,  default: 'Doe'
        age:     type: Number
        gender:  type: Boolean, default: true
      $virtual:
        name:
          read:  -> "#{ @fname } #{ @lname }"
          write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
        adult:   read: -> @age > 18
    }
    it ' should support reverting', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28, gender: true
      person.fname  = 'Jane'
      person.lname  = 'Doe'
      person.age    = 18
      person.gender = false
      person.revert()
      expect( person.name ).to.be 'Robert Messerle'
      expect( person.age ).to.be 28
      expect( person.gender ).to.be true
    it 'should support saving (no path)', ->
      person = new Person()
      expect( person.name ).to.be 'John Doe'
      expect( person.age ).to.be null
      expect( person.gender ).to.be true
      person.fname = 'Jane'
      person.age = 18
      person.gender = false
      person.update()
      expect( person.name ).to.be 'Jane Doe'
      expect( person.age ).to.be 18
      expect( person.gender ).to.be false
      person.save()
      person.revert()
      expect( person.name ).to.be 'Jane Doe'
      expect( person.age ).to.be 18
      expect( person.gender ).to.be false
  describe '$static', ->
    Person = new Model {
      $props:
        fname:  type: String,  default: 'John'
        lname:  type: String,  default: 'Doe'
        gender: type: Boolean, default: true
      $static:
        men:    -> for person in @items when person.gender then person
        women:  -> for person in @items when not person.gender then person
    }
    new Person
    new Person gender: false
    it 'should support statistics', ->
      expect( Person.men ).to.be.ok()
      expect( Person.men() ).to.be.an Array
      expect( Person.women() ).to.be.an Array
      expect( Person.men()[ 0 ].gender ).to.be true
      expect( Person.women()[ 0 ].gender ).to.be false
  describe '#validate', ->
    runTests = ( Person ) ->
      it 'should reject an empty name', ->
        person = new Person name: 'John Doe'
        expect( person.name ).to.be 'John Doe'
        person.set name: ''
        person.save()
        person.revert()
        expect( person.name ).to.be 'John Doe'
    describe 'as $validate property', ->
      runTests new Model {
        $props: name: type: String
        $validate: name: ( value ) -> value?.length
      }
    describe 'as property option', ->
      runTests new Model $props: name: type: String, validate: ( value ) -> value?.length
  describe '#subscribe', ->
    catches  = null
    runTests = ( Person ) ->
      it 'should not catch the initial load', ->
        catches = []
        person = new Person name: 'John Doe'
        expect( catches ).to.eql []
      it 'should catch an update post-init', ->
        catches = []
        person = new Person name: 'John Doe'
        person.set name: 'Jane Doe'
        expect( catches ).not.to.be.empty()
        expect( catches.length ).to.be 1
        expect( catches[ 0 ] ).to.be.ok()
        expect( catches[ 0 ].value ).to.be 'Jane Doe'
        expect( catches[ 0 ].oldValue ).to.be 'John Doe'
    describe 'as property option', ->
      runTests new Model $props: name: type: String, subscribe: ( value, oldValue ) -> catches.push value: value, oldValue: oldValue
    describe 'as $subscribe property', ->
      runTests new Model {
        $props: name: type: String
        $subscribe: name: ( value, oldValue ) -> catches.push( value: value, oldValue: oldValue )
      }
  describe '#extend', ->
    Animal = new Model {
      $props:
        fname: type: String
        lname: type: String
        age:   type: Number
      $virtual: name:
        read: -> "#{ @fname } #{ @lname }"
        write: ( value ) -> [ @fname, @lname ] = value.split( /\s+/g )
    }
    Cat = new Model {
      $extend: Animal
      $props: breed: type: String
    }
    it 'should inherit properties', ->
      expect( Cat._meta.$props.fname.type ).to.be String
      expect( Cat._meta.$virtual.name.read ).to.be.ok()
    it 'should allow use of inherited props', ->
      ajax = new Cat name: 'Ajax Lo', age: 1
      expect( ajax.fname ).to.be 'Ajax'
      expect( ajax.lname ).to.be 'Lo'
      expect( ajax.age ).to.be 1
  describe '#escape', ->
    Tag = new Model $props: type: String, html: String
    it 'should escape HTML tags', ->
      div = new Tag type: 'div', html: '<div class="div"></div>'
      expect( div.escape( 'html' ) ).to.be '&lt;div class="div"&gt;&lt;/div&gt;'
  describe '#unset', ->
    Person = new Model $props: name: default: 'John Doe'
    it 'should revert to the default value', ->
      person = new Person name: 'Jane Doe'
      expect( person.name ).to.be 'Jane Doe'
      person.unset( 'name' )
      expect( person.name ).to.be 'John Doe'
  describe '$props.model', ->
    Cat = new Model $props: name: type: String
    Person = new Model {
      $props:
        fname:  type: String, default: 'John'
        lname:  type: String, default: 'Doe'
        father: type: -> Person
        mother: type: -> Person
        pet:    type: Cat
    }
    person = new Person {
      fname:   'Robert'
      lname:   'Messerle'
      father:
        fname: 'Richard'
        lname: 'Messerle'
      mother:
        fname: 'Betsy'
        lname: 'Messerle'
      pet:
        name:  'Annabelle'
    }
    it 'should store the properties', ->
      expect( person.father.fname ).to.be 'Richard'
      expect( person.father.lname ).to.be 'Messerle'
      expect( person.mother.fname ).to.be 'Betsy'
      expect( person.mother.lname ).to.be 'Messerle'
      expect( person.pet.name ).to.be 'Annabelle'
    it 'should wrap the properties in the correct model', ->
      expect( person.father ).to.be.a Person
      expect( person.mother ).to.be.a Person
      expect( person.pet ).to.be.a Cat
  describe '#toJSON', ->
    Cat = new Model $props: name: type: String
    Person = new Model $props:
      fname:  type: String, default: 'John'
      lname:  type: String, default: 'Doe'
      age:    type: Number
      male:   type: Boolean
      mother: type: -> Person
      father: type: -> Person
      pet:    type: Cat
    it 'should convert to plain JSON', ->
      person = new Person {
        fname:  'Robert', lname: 'Messerle', age:  28, male:  true
        father: fname: 'Richard', lname: 'Messerle', male:  true
        pet:    name:  'Annabelle'
      }
      expect( person.toJSON() ).to.eql {
        fname:  'Robert', lname: 'Messerle', age: 28, male: true, mother: null
        father: fname: 'Richard', lname: 'Messerle', age: null, male: true, mother: null, father: null, pet: null
        pet:    name:  'Annabelle'
      }
  describe 'Ajax Calls', ->
    beforeEach ->
      $._ajax = $.ajax
      $.ajax = ( obj ) -> obj
    afterEach ->
      $.ajax = $._ajax
      delete $._ajax
    Person = new Model {
      $path:  '/person'
      $props:
        id:   type: Number
        name: type: String
    }
    it 'should have the correct URLs', ->
      $.ajax = ( obj ) -> obj
      person = new Person id: 1, name: 'John Doe'
      expect( Person.load().url ).to.be '/person'
      expect( Person.load( 1 ).url ).to.be '/person/1'
      expect( person.send().url ).to.be '/person'
      expect( person.send().data ).to.eql id: 1, name: 'John Doe'
      expect( person.fetch().url ).to.be '/person/1'
    it 'load the list of items from the backend', ->
      $.ajax = ( obj ) ->
        obj.success [
          { id: 1, name: 'foo' }
          { id: 2, name: 'bar' }
          { id: 3, name: 'baz' }
        ]
      Person.load()
      expect( Person.items.length ).to.be 3
      $.ajax = ( obj ) -> obj.success id: 1, name: 'foo'
      expect( Person.items[ 0 ].send().url ).to.be '/person/1'
    it 'should update the data after a post', ->
      Person.items = []
      person = new Person name: 'foo'
      $.ajax = ( obj ) -> obj.success id: 2, name: 'foo'
      expect( Person.items.length ).to.be 1
      expect( person.id ).to.be null
      expect( person.send().url ).to.be '/person'
      expect( person.id ).to.be 2
      expect( person.send().url ).to.be '/person/2'
    it 'should load one', ->
      Person.items = []
      expect( Person.items.length ).to.be 0
      $.ajax = ( obj ) -> obj.success id: 1, name: 'foo'
      Person.load 1, ( item ) ->
        expect( Person.items.length ).to.be 1
        expect( item.id ).to.be 1
        expect( item.name ).to.be 'foo'
  describe '#clone', ->
    Person = new Model {
      $props:
        fname: type: String
        lname: type: String
        age:   type: Number
    }
    person = new Person fname: 'Robert', lname: 'Messerle', age: 28
    it 'should create a clone of the item', ->
      clone = person.clone()
      expect( clone.fname ).to.be 'Robert'
      expect( clone.lname ).to.be 'Messerle'
      expect( clone.age ).to.be 28
  describe '#hasChanged', ->
    Person = new Model {
      $props:
        fname: type: String
        lname: type: String
        age:   type: Number
      $virtual: name:
        read: -> "#{ @fname } #{ @lname }"
        write: ( name ) -> [ @fname, @lname ] = name.split( ' ' )
    }
    it 'should start out as false', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28
      expect( person.hasChanged ).to.be false
    it 'should be triggered by a prop change', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28
      expect( person.hasChanged ).to.be false
      person.fname = 'Richard'
      person.update()
      expect( person.fname ).to.be 'Richard'
      expect( person.lname ).to.be 'Messerle'
      expect( person.name ).to.be 'Richard Messerle'
      expect( person.age ).to.be 28
      expect( person.hasChanged ).to.be true
    it 'should be triggered by a prop setter', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28
      expect( person.hasChanged ).to.be false
      person.set 'fname', 'Richard'
      expect( person.fname ).to.be 'Richard'
      expect( person.lname ).to.be 'Messerle'
      expect( person.name ).to.be 'Richard Messerle'
      expect( person.age ).to.be 28
      expect( person.hasChanged ).to.be true
    it 'should be triggered by a multi-prop setter', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28
      expect( person.hasChanged ).to.be false
      person.set fname: 'Richard'
      expect( person.fname ).to.be 'Richard'
      expect( person.lname ).to.be 'Messerle'
      expect( person.name ).to.be 'Richard Messerle'
      expect( person.age ).to.be 28
      expect( person.hasChanged ).to.be true
    it 'should be triggered by a virtual', ->
      person = new Person fname: 'Robert', lname: 'Messerle', age: 28
      expect( person.hasChanged ).to.be false
      person.set name: 'Richard Messerle'
      expect( person.fname ).to.be 'Richard'
      expect( person.lname ).to.be 'Messerle'
      expect( person.name ).to.be 'Richard Messerle'
      expect( person.age ).to.be 28
      expect( person.hasChanged ).to.be true
