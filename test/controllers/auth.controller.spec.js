var assert = require('assert');
var authController = require('../../controllers/auth.controller');

describe('AuthController', function(){
	describe('isAuthorized', function(){
		beforeEach(function(){
			console.log('Running before each...');
			authController.setRoles(['user']);
		})
		it('Should return false if not authorized', function(){
			assert.equal(false, authController.isAuthorized('admin'));
		})
		it('Should return true if authorized', function(){
			assert.equal(true, authController.isAuthorized('user'));
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