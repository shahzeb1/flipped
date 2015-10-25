/**
 * Created by lschubert on 10/24/15.
 * used for the making and retrieving of lectures
 */

'use strict';

app.factory('lectureMake', lectureFactory);


lectureFactory.$inject = ['$http', '$window'];

function lectureFactory($http, $window){
    var lectureMake = {};
    lectureMake.submitLecture = function(lecture){
        return $http.post('/class/'+lecture.classId+'/lecture',lecture).success(function(){
                alert("Lecture submitted successfully!");
        });
    };

    //get lecture by lectureid
    lectureMake.getLectureById = function(lectureId){
        return $http.get("/lecture",lectureId).success(function(data){
            return data;
        })
    };
    lectureMake.getAllLecturesByClassId = function(classId){
        return $http.get('/lecture', classId).success(function(data){
            return data;
        });
    };


    return lectureMake;
};