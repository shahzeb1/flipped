var request = require('supertest')
    , express = require('express');
var chai = require('chai');
var assert = chai.assert;

var app = require('../app');

describe('Testing Routes', function() {
    it.skip("renders successfully", function(done) {
        request(app).get('/').expect(200, done);
    });

    it.skip("posts successfully", function(done) {
        var tu = {
            username: "teacher",
            password: "test",
            email: "teacher@gmail.com",
            teacher: true
        };
        request(app)
            .post('/register')
            .send(tu)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.equal(res.status, 200);
                done();
            });
    });

    it.skip("logins successfully", function(done) {
            var tu = {
                username: "test1111",
                password: "test"
            };
            request(app)
                .post('/login')
                .send(tu)
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    assert.equal(res.status, 200);
                    assert.isNotNull(res.token, "should of created a token");
                    done();
                });
    });
    it("create class successfully", function(done) {
        var newClass = {
            name: "Sexed",
            teacherId: "6dc391f1-84f1-4a01-8efd-e26170fd2d25"
        };
        request(app)
            .post('/class')
            .send(newClass)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.equal(res.status, 200);
                assert.isNotNull(res.code, "should of created a code");
                done();
            });
    });

    it("create lecture successfully", function(done) {
        var lecture = {
            name: "Condoms",
            classId: "bd7c51a5-367c-444c-9cf5-1ce712c67eba",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        };
        request(app)
            .post('/class/bd7c51a5-367c-444c-9cf5-1ce712c67eba/lecture')
            .send(lecture)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.equal(res.status, 200);
                done();
            });
    })
});