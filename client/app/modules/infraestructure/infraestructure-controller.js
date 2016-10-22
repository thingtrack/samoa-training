angular.module('SamoaApp')
    .controller('InfraestructureController', ['$scope', '$log', '$timeout', '$mdEditDialog', '$mdDialog', '$q', '$document', 'Tank', function ($scope, $log, $timeout, $mdEditDialog, $mdDialog, $q, $document, Tank) {
        'use strict';

        var bookmark;

        $scope.filter = {
            options: {
                debounce: 500
            }
        };

        $scope.selected = [];

        $scope.limitOptions = [5, 10, 15];

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        $scope.query = {
            filter: '',
            order: 'code',
            limit: 5,
            page: 1
        };

        function getTanks() {
            var deferred = $q.defer();
            $scope.promise = deferred.promise;

            Tank.find()
                .$promise
                .then(function(tanks, responseHeaders) {
                    if (tanks.length > 0) {
                        $scope.tanks = JSON.parse(angular.toJson(tanks));
                    }

                    $log.info('Query ' + tanks.length + ' tanks');

                    deferred.resolve();
                },
                function(httpResponse) {
                    var error = httpResponse.data.error;
                    console.log('Error updating driver - ' + error.status + ": " + error.message);

                    deferred.resolve();
                });
        }

        // Initial load data list
        getTanks();

        // table event handlers
        $scope.loadStuff = function () {
            getTanks();
        };

        $scope.addStuff = function (event) {
            var infraestructure = {active: true};

            $mdDialog.show({
                controller         : 'InfraestructureFormController',
                controllerAs       : 'vm',
                locals             : {
                    infraestructure: infraestructure
                },
                templateUrl        : 'app/modules/infraestructure/form/infraestructure-form-template.html',
                parent             : angular.element($document.body),
                targetEvent        : event,
                clickOutsideToClose: true
            }).then(function(result){
                Tank.updateOrCreate(infraestructure)
                    .$promise
                    .then(function(infraestructure, responseHeaders) {
                        // log operation data list
                        console.log('Infraestructure ' + infraestructure.code + " added");

                        // refresh data list
                        getTanks();

                        // unselect data list
                        $scope.selected = [];
                    },
                    function(httpResponse) {
                        // error operation data list
                        var error = httpResponse.data.error;
                        console.log('Error adding tank - ' + error.status + ": " + error.message);

                        // unselect data list
                        $scope.selected = [];
                    });
            }, function() {
                console.log("Operation canceled");
            });
        };

        $scope.editStuff = function (event) {
            if ($scope.selected.size > 1)
                return;

            var infraestructure = JSON.parse(angular.toJson($scope.selected[0]));

            $mdDialog.show({
                controller         : 'InfraestructureFormController',
                controllerAs       : 'vm',
                locals             : {
                    infraestructure: infraestructure
                },
                templateUrl        : 'app/modules/infraestructure/form/infraestructure-form-template.html',
                parent             : angular.element($document.body),
                targetEvent        : event,
                clickOutsideToClose: true
            }).then(function(result){
                Tank.updateOrCreate(infraestructure)
                    .$promise
                    .then(function(infraestructure, responseHeaders) {
                        // log operation data list
                        console.log('Infraestructure ' + infraestructure.code + " updated");

                        // refresh data list
                        getTanks();

                        // unselect data list
                        $scope.selected = [];
                    },
                    function(httpResponse) {
                        // error operation data list
                        var error = httpResponse.data.error;
                        console.log('Error updating tank - ' + error.status + ": " + error.message);

                        $scope.selected = [];
                    });
            }, function() {
                console.log("Operation canceled");
            });
        };

        $scope.removeStuff = function (event) {
            $scope.selected.forEach(function(infraestructure) {
                infraestructure.active = false;

                Tank.updateOrCreate(infraestructure)
                    .$promise
                    .then(function(infraestructure, responseHeaders) {
                        // log operation data list
                        console.log('Infraestructure ' + infraestructure.code + " unactivated");

                        // refresh data list
                        getTanks();

                        // unselect data list
                        $scope.selected = [];
                    },
                    function(httpResponse) {
                        // error operation data list
                        var error = httpResponse.data.error;
                        console.log('Error unactivating tank - ' + error.status + ": " + error.message);

                        $scope.selected = [];
                    });
            });
        };

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        $scope.logItem = function (item) {
            console.log(item.name, 'was selected');
        };

        $scope.logOrder = function (order) {
            console.log('order: ', order);
        };

        $scope.logPagination = function (page, limit) {
            console.log('page: ', page);
            console.log('limit: ', limit);
        };

        // filter event handlers
        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.filter = '';

            if($scope.filter.form.$dirty) {
                $scope.filter.form.$setPristine();
            }
        };

        $scope.$watch('query.filter', function (newValue, oldValue) {
            if(!oldValue) {
                bookmark = $scope.query.page;
            }

            if(newValue !== oldValue) {
                $scope.query.page = 1;
            }

            if(!newValue) {
                $scope.query.page = bookmark;
            }

            getTanks();
        });
    }]);
