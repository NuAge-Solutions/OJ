QUnit.test('Collection Tests', function(assert){
    // OjArray Tests
    var ary = new OjArray([1, 2, 3, 4, 5]);

    // test type
    assert.ok(ary.is(OjArray) && ary.clsName == 'OjArray', 'OjArray Type Verified');

    // test inheritance
    assert.ok(ary.is(OjObject), 'OjArray Inheritance Verified');

    // test length
    assert.equal(ary.length, 5, 'OjArray Length Verified');

    // test first index
    assert.equal(ary[0], ary.first, 'OjArray First Index Verified');

    // test last index
    assert.equal(ary[ary.length - 1], ary.last, 'OjArray Last Index Verified');

    // test append
    ary.append(6);

    assert.equal(ary.last, 6, 'OjArray Append Verified');

    // test prepend
    ary.prepend(0);

    assert.equal(ary.first, 0, 'OjArray Prepend Verified');

    // test indexOf
    assert.equal(ary.indexOf(3), 3, 'OjArray IndexOf Verified');

    // test contains
    assert.ok(ary.contains(3), 'OjArray Contains Verified');

    // test remove
    ary.remove(3);

    assert.notOk(ary.contains(3), 'OjArray Remove Verified');

});