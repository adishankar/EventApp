angular.module('uniService',[])
    .service('uniService', ['$http', '$q', '$window', function uniService($http, $q, $window){
        
        var deferred = $q.defer();
        this.createUni = function(uni){
            $http.post('http://localhost:3000/api/location', {
                locationName: uni.location.name,
                locationLatitude: uni.location.geometry.location.lat(),
                locationLongitude: uni.location.geometry.location.lng()
            }).then(function(data){
                console.log("uni service")
                console.log(data.data);
                $http.post('http://localhost:3000/api/university', {
                    uniName: uni.name.toString(),
                    description: uni.description.toString(),
                    numStudents: uni.numStudents.toString(),
                    locationId: data.data.insertId
                }).then( function(data){
                    console.log(data);
                    deferred.resolve(data);
                });
            });
                

            return deferred.promise;
        };

        this.getAllUniIds = function(){
            $http.post('http://localhost:3000/api/university')
                .then(function (data){
                    deferred.resolve(data);
                    console.log('got data');
                    console.log(data);
                });
                return deferred.promise;
        }

        // this.getUniversityAdmin = function(id){
        //     $http.post('http://localhost:3000/api/university/admin/' + id)
        //         .then(function(data){
        //             console.log(data);
        //         })
        // }

    }]);