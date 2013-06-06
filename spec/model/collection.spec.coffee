describe 'Recoil.Collection', ->

  it 'should exist', ->
    expect( Recoil.Collection ).not.toBeNull()
    expect( Recoil.Collection ).toBeDefined()

  it 'should allow you to create a collection type', ->
    Numbers = new Recoil.Collection

  it 'should should allow saving', ->
    numbers = new Recoil.Collection
    numbers.value = [ 1, 2, 3 ]
    expect( numbers.value ).not.toBe numbers.savedValue
    expect( numbers.value ).not.toEqual numbers.savedValue
    numbers.save()
    expect( numbers.value ).not.toBe numbers.savedValue
    expect( numbers.value ).toEqual numbers.savedValue

  it 'should allow reverting', ->
    numbers = new Recoil.Collection
    numbers.value = [ 1, 2, 3 ]
    numbers.save()
    numbers.value.push 4
    expect( numbers.value ).not.toEqual numbers.savedValue
    numbers.revert()
    expect( numbers.value ).not.toBe numbers.savedValue
    expect( numbers.value ).toEqual numbers.savedValue

  describe 'Native Array methods', ->

    numbers = new Recoil.Collection

    it 'should support push', ->
      expect( numbers.push ).toBeDefined()
      expect( typeof numbers.push ).toBe 'function'
      numbers.push 1
      expect( numbers.value ).toEqual [ 1 ]

    it 'should support indexOf', ->
      expect( numbers.indexOf 1 ).toBe 0

    it 'should support pop', ->
      expect( numbers.pop() ).toBe 1
      expect( numbers.value ).toEqual []
