var assert = require('assert');


describe('Basic Mocha Test', function(){
	it('should not throw error', function(){
		assert.equal(3,3);
	})
});

describe('Basic Mocha Test', function(){
	it('should throw error', function(){
		throw({message: 'thrown error'});
	})
});