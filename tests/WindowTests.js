QUnit.test('Window Tests', function(assert){
    var obj = new OjAlert('content', 'title');

    assert.ok(obj.is(OjAlert), 'Type Verified');
    assert.ok(obj.is(OjComponent), 'Inheritance Verified');
    assert.equal(obj.content, 'content', 'Content Verified');
    assert.equal(obj.title, 'title', 'Title Verified');
});