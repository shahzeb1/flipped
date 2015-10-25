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
            username: "teacher1",
            password: "test",
            email: "teacher1@gmail.com",
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
                console.log(res);
                assert.equal(res.status, 200);
                done();
            });
    });

    it("logins successfully", function(done) {
            var tu = {
                username: "Enrique",
                password: "abc123"
            };
            request(app)
                .post('/login')
                .send(tu)
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res.user);
                    assert.equal(res.status, 200);
                    assert.isNotNull(res.token, "should of created a token");
                    done();
                });
    });
    it.skip("create class successfully", function(done) {
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
            classId: "bd50ac07-3b03-4ee2-82b7-4d92c40e9588",
            videoUrl: "https://www.youtube.com/watch?v=E2LM3ZlcDnk",
            problems: [
                {
                    id: 0,
                    question: "How long is the average penis?",
                    problemType: 'mc',
                    answers: [{
                        id: 0,
                        possibleAnswer: '10 inches',
                        correctAnswer: 1
                    },
                        {
                            id: 1,
                            possibleAnswer: '12 inches',
                            correctAnswer: 0
                        },
                        {
                            id: 2,
                            possibleAnswer: '6 inches',
                            correctAnswer: 0
                        },
                        {
                            id: 3,
                            possibleAnswer: '4 inches',
                            correctAnswer: 0
                        }
                    ]
                }]
        }

        request(app)
            .post('/class/bd50ac07-3b03-4ee2-82b7-4d92c40e9588/lecture')
            .send(lecture)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.equal(res.status, 200);
                done();
            });
    });
    it.skip("get classes successfully", function(done) {
        request(app)
            .get('/classes/6dc391f1-84f1-4a01-8efd-e26170fd2d25/1')
            //.send({
            //    id: "6dc391f1-84f1-4a01-8efd-e26170fd2d25",
            //    teacher: true
            //})
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                assert.equal(res.status, 200);
                console.log(res.body.classes);
                done();
            })
    });
    it.skip("register for class successfully", function(done) {
        var obj = {
            id: "a95475c3-9aaf-4a59-b413-853f7f648c0f",
            code: "EwzVVbr"
        };
        request(app)
            .post('/registerclass')
            .send(obj)
            // end handles the response
            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                assert.equal(res.status, 200);
                done();
            });
    });
});
