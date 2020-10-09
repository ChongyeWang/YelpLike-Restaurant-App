var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:3001/home' , function(error, response, body) {
        expect(body).to.equal('home');
        done();
    });
});