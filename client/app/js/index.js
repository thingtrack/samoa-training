angular.module('SamoaApp', ['ngMaterial', 'ui.router', 'md.data.table', 'lbServices'])
    .config(['$stateProvider', '$mdThemingProvider', function ($stateProvider, $mdThemingProvider) {
        'use strict';

        // configure default application theme
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo');

        // configure application routes
        $stateProvider
            .state('user', {
                url: '/user',
                data: {
                    title: 'User Master'
                },
                views: {
                    "content": {
                        templateUrl: 'app/modules/user/user-template.html',
                        controller: 'UserController'
                    }
                }
            }).state('product', {
                url: '/product',
                data: {
                    title: 'Product Master'
                },
                views: {
                    "content": {
                        templateUrl: 'app/modules/product/product-template.html',
                        controller: 'ProductController'
                    }
                }
            }).state('infraestructure', {
                url: '/infraestructure',
                data: {
                    title: 'Infraestructure Management'
                },
                views: {
                    "content": {
                        templateUrl: 'app/modules/infraestructure/infraestructure-template.html',
                        controller: 'InfraestructureController'
                    }
                }
            }).state('canbus', {
                url: '/canbus',
                data: {
                    title: 'CAN bus Management'
                },
                views: {
                    "content": {
                        templateUrl: 'app/modules/canbus/canbus-template.html',
                        controller: 'CanbusController'
                    }
                }
            });
    }])
    .controller('sampleController', ['$mdEditDialog', '$q', '$scope', '$log', '$timeout', '$mdSidenav', '$state', '$interval', function ($mdEditDialog, $q, $scope, $log, $timeout, $mdSidenav, $state, $interval) {
        'use strict';

        $scope.customerName = 'Miguel Salinas';

        ////////// Toolbar event handlers //////////
        $scope.alarm = function () {
            $log.debug("Alarm click event is done");
        };

        $scope.help = function () {
            $log.debug("Help click event is done");
        };

        $scope.profile = function () {
            $log.debug("Profile click event is done");
        };

        $scope.logout = function () {
            $log.debug("Logout click event is done");
        };

        ////////// Menu event handlers //////////
        $scope.menuItemClick = function (event) {
            if (event == 'USER') {
                $state.go('user');
                $log.debug("User Master click event is done");
            }
            else if (event == 'PRODUCT') {
                $state.go('product');
                $log.debug("Product Master click event is done");
            }
            else if (event == 'INFRAESTRUCTURE') {
                $state.go('infraestructure');
                $log.debug("Infraestructure Management click event is done");
            }
            else if (event == 'CANBUS') {
                $state.go('canbus');
                $log.debug("Can Bus Management click event is done");
            }
            else if (event == 'VISUALIZE') {
                $log.debug("Visualize Management click event is done");
            }
            else if (event == 'ORDERS') {
                $log.debug("orders Management click event is done");
            }
        }

        ////////// Quick Panel event handlers //////////
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };

        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };

        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);

                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        };

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        };

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        };

        // footer clock
        var tick = function() {
            $scope.clock = Date.now();
        };

        tick();

        $interval(tick, 1000);
    }]);
