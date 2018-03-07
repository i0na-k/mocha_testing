var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chaiAsPromised = require('chai-as-promised');
var chai = require('chai');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function(){
	describe('isAuthorized', function(){
		var user = {};
		beforeEach(function(){
			user = {
				roles: ['user'],
				isAuthorized: function(neededRole) {
					return this.roles.indexOf(neededRole) >= 0;
				}
			}
			sinon.spy(user, 'isAuthorized');
			authController.setUser(user);
		});
		it('Should return false if not authorized', function(){
			var isAuth = authController.isAuthorized('admin');
			console.log(user.isAuthorized);
			user.isAuthorized.calledOnce.should.be.true;

			expect(isAuth).to.equal(false);
		})
		it('Should return true if authorized', function(){
			// assert.equal(true, authController.isAuthorized('user'));
			authController.setRoles(['user', 'admin']);
			var isAuth = authController.isAuthorized('admin');
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

describe('isAuthorizedPromise', function(){
	it('Should return false if not authorized', function(){
		authController.setRoles(['user']);
		return authController.isAuthorizedPromise('user').should.eventually.be.true;
			});
	})

describe('getIndex functionality',function() {
  var user = {};
  beforeEach(function () {
    user = {
      roles: ['user'],
      isAuthorized: function (neededRole) {
        return this.roles.indexOf(neededRole) >= 0;
      }
    }
  });
  it('getIndex should return a rendered response', function () {
    var isAuth = sinon.stub(user, 'isAuthorized').throws();
    var req = { user: user };
    var res = {
      render: function (){}
    };

    var mock = sinon.mock(res);
    mock.expects('render').once().withExactArgs('Error_Message');
    authController.getIndex(req, res);
    mock.verify();
  })
});