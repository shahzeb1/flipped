/**
 * Created by lschubert on 10/24/15.
 */
app.factory('fClass', classFactory);

classFactory.$inject = ['$http','auth'];

function classFactory($http, auth){
    var fClass = {};

    //add class
    fClass.addClass = function(name, userID){
        var newClass = {};
        newClass.name = name;
        newClass.teacherId = userID;
        $http.post('/class',newClass);
    };

    //retrieve classes
    fClass.retrieveClasses = function(id, teacher){
        return $http.get('/classes/'+id+'/'+teacher).success(function(data){
            console.log(data);
            return data.classes;
        });
    }
    return fClass;
}