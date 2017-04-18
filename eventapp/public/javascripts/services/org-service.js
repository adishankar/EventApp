angular.module('orgService',['userService'])
    .service('orgService', ['$http', '$q', '$window', 'userService', function orgService($http, $q, $window, userService){
        
        var deferred = $q.defer();
        var def2 = $q.defer();
        var deferred2 = $q.defer();
        var def3 = $q.defer();
        var def4 = $q.defer();
        var def5 = $q.defer();
        //create an organization
        this.createOrg = function(rso){
            keepgoing = true;
            if(rso.studentEmails){
                var s = rso.studentEmails.split(';');
              // console.log(s.length);
                if(s.length <= 4){
                    def4.resolve("");
                    keepgoing = false;
                }
                else{
                    for(var i = 0; i<s.length-1; i++){
                      // console.log(s[i].split('@')[1] + " " + s[i+1].split('@')[1])
                        if((s[i].split('@')[1] != s[i+1].split('@')[1]) && keepgoing == true) {
                          // console.log("fuckno");
                            keepgoing=false;      
                          // console.log(keepgoing);                      
                            def4.resolve("");
                        }
                    }
                }
                
            }
            if(!keepgoing){
                return def4.promise;
            }
            var user = userService.getUserData();
            rso.universityId = user.universityID;
          console.log(rso);
            $http.post('http://localhost:3000/api/rsos', {
                rsoName: rso.name,
                adminId: rso.userId,
                rsoDesc: rso.description,
                universityId: rso.universityId
            }).then( function(data){
                console.log(data);
                if(data.data=="" || data.data == "missing details"){
                    def4.resolve("");
                }else{
                  // console.log('hello');
                    $http.post('http://localhost:3000/api/rso/join/' + data.data.insertId + '/' + rso.userId)
                        .then(function(data2){
                          // console.log(data2);
                            def4.resolve(data);
                        });
                }
                
                //def4.resolve(data);
            });

            return def4.promise;
        };

        //this needs to be fixed
        this.getJoinedOrgs = function(id){

            var orgData;

            $http.get('http://localhost:3000/api/rsos/getJoined/' + id, {
                // type: "orgRequest"
                userId: id
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.getOrgDetails = function(rsoID){
            $http.get('http://localhost:3000/api/rso/'+rsoID,{
                
            }).then(function(data){
              // console.log(data);
                deferred2.resolve(data);
            })
            return deferred2.promise;
        }
        //search for all the organizations by name
        this.searchOrgs = function(query, user){
            def3 = $q.defer();
            var url = 'http://localhost:3000/api/rsos/search';
            $http.post(url, {
                query: query,
                universityID: user.universityID
            }).then( function(data){
                def3.resolve(data);
            })

            return def3.promise;
        };

        //join an organization
        //takes the id of the organization
        this.joinOrg = function(user, org){
          // console.log(org);
            var url = 'http://localhost:3000/api/rso/join/' + org + '/' + user;
            $http.post(url, {
                user: user,
                org: org
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.isInRso = function(user, org){
            var url = 'http://localhost:3000/api/rso/' + org + '/' + user;
            $http.get(url,{
                user:user,
                org:org
            }).then( function(data){
                def2.resolve(data);
            })
            return def2.promise;
        }

        this.deleteRso = function(org){
            console.log(org);
            var url = 'http://localhost:3000/api/rso/' + org;
            $http.delete(url,{
                rsoId: org
            }).then(function(data){
                def5.resolve(data);
            })
            return def5.promise;
        }

    }]);