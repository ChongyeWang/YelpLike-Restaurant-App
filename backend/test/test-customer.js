var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:3001/customers-setting' , function(error, response, body) {
        expect(response.statusCode).to.equal(401);
        done();
    });
});