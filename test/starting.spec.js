var assert = require('assert');
var should = require('chai').should();


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

describe.only('Object testing', function(){
	it('should check property of my object', function(){
	var myObj = {name: 'Iona', faveColour: 'purple'};
	myObj.should.have.property('faveColour').equal('purple');
	})
});

// compare two objects
// need to add deep flag as obj2 != obj1 literally
// to get test to pass without using deep flag have to do
// obj2 = obj1
describe.only('Compare objects', function(){
	it('obj1 should equal obj2', function(){
		var obj1 = {faveFood: 'biscuits', age: 20, car: 'HondaJazz'};
		var obj2 = {faveFood: 'biscuits', age: 20, car: 'HondaJazz'};
		obj1.should.deep.equal(obj2);
	})
})