var pg = require('pg');
var uuid = require('uuid');
var _ = require('lodash');

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
            obj.whereString += "$" + counter.toString();
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
        });
    }, cb());
}

function retrieveUser(username,password, cb){
    var user = {};
    console.log("database part");
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            console.log(err);
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

module.exports.test =  test;
module.exports.insertData =  insertData;
module.exports.selectData =  selectData;
module.exports.retrieveUser = retrieveUser;