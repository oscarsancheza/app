angular.module('app.services', [])

    .factory('globalFunctions', function ($ionicPopup) {
        return {
            mensaje: function (title, message) {
                console.log("hola mundo");
            }
        };
    })

    .service('appService', function ($http, $q, MainDir) {
        
        return {
            post: function (url, data) {
                var defered = $q.defer();
                $http.post(MainDir.url + url, data).
                    success(function (data) {
                        defered.resolve(data);
                    }).
                    error(function (error) {
                        defered.reject(error)
                    });

                return defered.promise;
            },
            get: function (url) {
                var defered = $q.defer();
                $http.get(MainDir.url + url).
                    success(function (data) {
                        defered.resolve(data);
                    }).
                    error(function (error) {
                        defered.reject(error)
                    });

                return defered.promise;
            }
        }

    });