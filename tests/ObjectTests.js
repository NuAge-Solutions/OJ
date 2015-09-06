QUnit.test('Object Tests', function(assert){
    var obj = new OjObject();

    assert.ok(obj.is(OjObject) && obj.clsName == 'OjObject', 'Type Verified');
    assert.ok(obj.id, 'ID Verified');
    assert.notEqual(obj.id, (new OjObject()).id, 'ID Uniqueness Verified');
});