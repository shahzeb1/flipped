var pg = require('pg');
var uuid = require('uuid');
var _ = require('lodash');
var async = require('async');

var conString = "postgres://mtbsickrider:@localhost/flipped";

function test(cb){
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        client.query('SELECT NOW() AS "theTime"', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            console.log(result.rows[0].theTime);
            //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
            client.end();
        });
    }, cb);
}

function parametrize(object) {
    var obj = {};
    var counter = 1;
    obj.valuesString = "(";
    obj.paramString = "(";
    obj.valuesArray = [];
    var first = true;
    _.forEach(object, function(value, key){
        if (first){
            obj.valuesString += key;
            obj.paramString += "$" + counter.toString();
            first = false;
        } else {
            obj.valuesString += ", " + key;
            obj.paramString += ", $" + counter.toString();
        }
        obj.valuesArray.push(value);
        counter++;
    });
    obj.valuesString += ")";
    obj.paramString += ")";
    return obj;
}

function insertData(info,cb){
    var client = new pg.Client(conString);
    console.log("client created");
    client.connect(function(err) {
        console.log("client connected");
        if(err) {
            console.log(err);
            return cb(err);
        }

        var params = parametrize(info.object);

        var queryString =
            "INSERT INTO " + info.tableName + " " +
            params.valuesString +
            "  VALUES " +
            params.paramString;
        console.log(queryString);


        client.query(queryString, params.valuesArray, function(err) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            cb(null);
        });
    });
}

function parametrizeSelect(object) {
    var obj = {};
    var counter = 1;
    obj.selectString = "";
    obj.whereString = "";
    obj.valuesArray = [];
    var first = true;
    _.forEach(object, function(value, key){
        if (first){
            obj.selectString += key;
            obj.whereString += key + " = $" + counter.toString();
            first = false;
        } else {
            obj.selectString += ", " + key;
            obj.whereString += ", $" + counter.toString();
        }
        obj.valuesArray.push(value);
        counter++;
    });
    obj.selectString += ")";
    obj.whereString += ")";
    return obj;
}

//finish
function selectData(info,cb) {
    var results = [];

    var client = new pg.Client(conString);
    client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
    client.connect(function(err) {
        if(err) {
            return cb(err);
        }

        var params = parametrize(info.object);

        var queryString =
            "INSERT INTO " + info.tableName + " " +
            params.valuesString +
            "  VALUES " +
            params.paramString;
        console.log(queryString);


        client.query(queryString, params.valuesArray, function(err) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            cb(null,results)
        });
    });
}

function selectStar(info,cb) {
    var results = [];

    var client = new pg.Client(conString);
    client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
    client.connect(function(err) {
        if(err) {
            return cb(err);
        }


        var queryString =
            "SELECT * from " + info.tableName + "" +
            ""
        console.log(queryString);


        client.query(queryString, params.valuesArray, function(err) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            cb(null,results)
        });
    });
}

function whereString(object) {
    var obj = {};
    var counter = 1;
    obj.whereString = "";
    obj.valuesArray = [];
    var first = true;
    _.forEach(object, function(value, key){
        if (first){
            obj.whereString += key + " = $" + counter.toString();
            first = false;
        } else {
            obj.whereString += "AND " + key + " = $" + counter.toString();
        }
        obj.valuesArray.push(value);
        counter++;
    });
    return obj;
}

function retrieveUser(username,password, cb){
    var user = {};
    console.log("database part");
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return cb(err);
        }

        var queryString =
            "Select * from appUser" +
            "  WHERE username = $1" +
            "  AND password = $2" ;

        console.log("before the query");
        client.query(queryString, [username, password], function(err,result) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            user = result.rows[0] || null;
            cb(null, user)
        });
    });

}

function retrieveTeacherClass(teacherId,cb) {

    var client = new pg.Client(conString);
    client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
    client.connect(function(err) {
        if(err) {
            return cb(err);
        }


        var queryString =
            "  SELECT * from class" +
            "  WHERE teacherId = $1" +
            "  ORDER BY name";
        console.log(queryString);


        client.query(queryString, [teacherId], function(err , results) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            cb(null,results.rows)
        });
    });
}

function retrieveStudentClasses(studentId,cb) {

    var client = new pg.Client(conString);
    client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
    client.connect(function(err) {
        if(err) {
            return cb(err);
        }


        var queryString =
            "SELECT * from class" +
            "INNER JOIN appUserClass as auc on auc.classId = class.id" +
            "INNER JOIN appUser as au on au.id = auc.appUserId" +
            "WHERE au.id = $1" +
            "ORDER BY name";
        console.log(queryString);


        client.query(queryString, [studentId], function(err , results) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            cb(null,results.rows)
        });
    });
}

function retrieveClassId(classCode, cb) {
    var client = new pg.Client(conString);
    client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
    client.connect(function(err) {
        if(err) {
            console.log(err);
            return cb(err);
        }
        console.log("client connected");

        var queryString =
            "  SELECT * from class" +
            "  WHERE code = $1";
        console.log(queryString);


        client.query(queryString, [classCode], function(err , results) {
            if(err) {
                console.log(err);
                return cb(err);
            }
            client.end();
            cb(null,results.rows[0])
        });
    });
}

function saveLecture(lecture , done){

    var client = new pg.Client(conString);
    client.connect();
        async.series([
            function saveLecture(cb) {
                var queryString =
                    "  INSERT INTO lecture" +
                    "  (id, name, classId, videoUrl)" +
                    "  VALUES ($1, $2, $3, $4)";


                client.query(queryString, [lecture.id, lecture.name, lecture.classId, lecture.videoUrl], function(err) {
                    if(err) {
                        console.log(err);
                        return cb(err);
                    }
                    cb(null)
                });
            },
            function saveProblems(cb) {
                for (var i =0; i< lecture.problems.length; i++) {
                    var queryString =
                        "  INSERT INTO problem" +
                        "  (id, lectureId, problemType, question)" +
                        "  VALUES ($1, $2, $3, $4)";

                    client.query(queryString, [i ,lecture.id, lecture.problems[i].problemType, lecture.problems[i].question], function(err) {
                        if(err) {
                            console.log(err);
                            return cb(err);
                        }
                        //time to move on
                        console.log(i);
                        if ( i == lecture.problems.length) {
                            console.log("moved on");
                            cb(null);
                        }
                    });
                }
            },
            function saveAnswers(cb) {
                async.each(lecture.problems[0].answers , function(answer, next) {
                    console.log(answer);
                    var queryString =
                        "  INSERT INTO problemAnswer" +
                        "  (id, problemId, lectureId, possibleAnswer, correctAnswer)" +
                        "  VALUES ($1, $2, $3, $4, $5)";


                    client.query(queryString, [answer.id, 0, lecture.id, answer.possibleAnswer, answer.correctAnswer], function (err) {
                        if (err) {
                            console.log(err);
                            return cb(err);
                        }
                        next();
                    });
                } , function(err) {
                    if (err) {
                        //bla bla bla
                    }
                    cb(null);
                });
                //console.log("enetered save answer");
                //for (var i = 0; i < lecture.problems.length; i++) {
                //    for (var j = 0; j < lecture.problems[i].answers.length; j++) {
                //
                //            //time to move on
                //            if (i == lecture.problems.length){
                //                if (j == lecture.problems[i-1].answers.length) {
                //                    console.log(j)
                //                    console.log(lecture.problems[i-1].answers.length);
                //                    console.log("why so many times?");
                //                    cb(null)
                //                }
                //            }
                //    }
                //}
            }
        ] , function (err, results) {
            if (err) {
                return done(err)
            }
            done();
        });
}

module.exports.test =  test;
module.exports.insertData =  insertData;
module.exports.selectData =  selectData;
module.exports.retrieveUser = retrieveUser;
module.exports.retrieveTeacherClass = retrieveTeacherClass;
module.exports.retrieveStudentClasses = retrieveStudentClasses;
module.exports.retrieveClassId = retrieveClassId;
module.exports.saveLecture = saveLecture;