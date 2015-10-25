/**
 * Created by lschubert on 10/24/15.
 * used for retrieving forum posts and adding comments
 */

app.factory('forum', forumFactory);

forumFactory.$inject = ['$http'];

forumFactory = function($http){
    var forum ={};

    //get problem
    forum.getProblem = function(problemId){
        return $http.get('/forum',problemId).success(data){
            return data;
        };
    };

    //get responses for problem

    //post new response


    //post new question


    return forum;
}