QUnit.test('Component Tests', function(assert){
    var obj = new OjComponent();

    assert.ok(obj.is(OjComponent), 'Type Verified');
    assert.ok(
        obj.is(OjStyleElement) && obj.is(OjElement) && obj.is(OjActionable) && obj.is(OjObject),
        'Inheritance Verified'
    );

});