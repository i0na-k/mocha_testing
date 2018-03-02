var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chaiAsPromised = require('chai-as-promised');
var chai = require('chai');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function(){
	describe('isAuthorized', function(){
		beforeEach(function(){
			console.log('Running before each...');
			authController.setRoles(['user']);
		})
		it('Should return false if not authorized', function(){
			var isAuth = authController.isAuthorized('admin');
			expect(isAuth).to.equal(false);
		})
		it('Should return true if authorized', function(){
			// assert.equal(true, authController.isAuthorized('user'));
			var isAuth = authController.isAuthorized('user');
			isAuth.should.be.true;
		})
	})
})

describe('isAuthorizedAsync', function(){
	it('Should return false if not authorized', function(done){
		this.timeout(2500);
		authController.setRoles(['user']);
		authController.isAuthorizedAsync('admin',
			function(isAuth){
				assert.equal(false,isAuth);
				done();
			});
	})
})

describe.only('isAuthorizedPromise', function(){
	it('Should return false if not authorized', function(){
		authController.setRoles(['user']);
		return authController.isAuthorizedPromise('user').should.eventually.be.true;
			});
	})