/**
 * Created by lschubert on 10/24/15.
 * used for retrieving forum posts and adding comments
 */

app.factory('forum', forumFactory);

forumFactory.$inject = ['$http'];

forumFactory = function($http){
    var forum ={};

    return forum;
}