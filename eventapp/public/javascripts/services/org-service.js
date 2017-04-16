angular.module('orgService',[])
    .service('orgService', ['$http', '$q', '$window', function orgService($http, $q, $window){
        
        var deferred = $q.defer();
        var def2 = $q.defer();
        var deferred2 = $q.defer();
        //create an organization
        this.createOrg = function(rso){
            $http.post('http://localhost:3000/dashboard', {
                type: "org",
                orgName: rso.name.toString(),
                adminEmail: rso.adminEmail.toString(),
                studentEmail1: rso.studentEmail1.toString(),
                studentEmail2: rso.studentEmail2.toString(),
                studentEmail3: rso.studentEmail3.toString(),
                studentEmail4: rso.studentEmail4.toString(),
                studentEmail5: rso.studentEmail5.toString(),
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
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
                console.log(data);
                deferred2.resolve(data);
            })
            return deferred2.promise;
        }
        //search for all the organizations by name
        this.searchOrgs = function(query){
            var url = 'http://localhost:3000/search';
            $http.post(url, {
                type: 'org',
                query: query
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        //join an organization
        //takes the id of the organization
        this.joinOrg = function(user, org){
            console.log(org);
            var url = 'http://localhost:3000/api/rso/join/' + org.toString() + '/' + user.toString();
            $http.post(url, {
                user: user,
                org: org
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

        this.isInRso = function(user, org){
            var url = 'http://localhost:3000/api/rso/' + org.toString() + '/' + user.toString();
            $http.get(url,{
                user:user,
                org:org
            }).then( function(data){
                def2.resolve(data);
            })
            return def2.promise;
        }

    }]);