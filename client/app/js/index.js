angular.module('SamoaApp', ['ngMaterial', 'ui.router', 'md.data.table'])
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

        ////////// Configure and initialize grid //////////
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
            order: 'name',
            limit: 5,
            page: 1
        };

        $scope.desserts = {
            "count": 9,
            "data": [
                {
                    "name": "Frozen yogurt",
                    "type": "Ice cream",
                    "calories": {"value": 159.0},
                    "fat": {"value": 6.0},
                    "carbs": {"value": 24.0},
                    "protein": {"value": 4.0},
                    "sodium": {"value": 87.0},
                    "calcium": {"value": 14.0},
                    "iron": {"value": 1.0}
                }, {
                    "name": "Ice cream sandwich",
                    "type": "Ice cream",
                    "calories": {"value": 237.0},
                    "fat": {"value": 9.0},
                    "carbs": {"value": 37.0},
                    "protein": {"value": 4.3},
                    "sodium": {"value": 129.0},
                    "calcium": {"value": 8.0},
                    "iron": {"value": 1.0}
                }, {
                    "name": "Eclair",
                    "type": "Pastry",
                    "calories": {"value": 262.0},
                    "fat": {"value": 16.0},
                    "carbs": {"value": 24.0},
                    "protein": {"value": 6.0},
                    "sodium": {"value": 337.0},
                    "calcium": {"value": 6.0},
                    "iron": {"value": 7.0}
                }, {
                    "name": "Cupcake",
                    "type": "Pastry",
                    "calories": {"value": 305.0},
                    "fat": {"value": 3.7},
                    "carbs": {"value": 67.0},
                    "protein": {"value": 4.3},
                    "sodium": {"value": 413.0},
                    "calcium": {"value": 3.0},
                    "iron": {"value": 8.0}
                }, {
                    "name": "Jelly bean",
                    "type": "Candy",
                    "calories": {"value": 375.0},
                    "fat": {"value": 0.0},
                    "carbs": {"value": 94.0},
                    "protein": {"value": 0.0},
                    "sodium": {"value": 50.0},
                    "calcium": {"value": 0.0},
                    "iron": {"value": 0.0}
                }, {
                    "name": "Lollipop",
                    "type": "Candy",
                    "calories": {"value": 392.0},
                    "fat": {"value": 0.2},
                    "carbs": {"value": 98.0},
                    "protein": {"value": 0.0},
                    "sodium": {"value": 38.0},
                    "calcium": {"value": 0.0},
                    "iron": {"value": 2.0}
                }, {
                    "name": "Honeycomb",
                    "type": "Other",
                    "calories": {"value": 408.0},
                    "fat": {"value": 3.2},
                    "carbs": {"value": 87.0},
                    "protein": {"value": 6.5},
                    "sodium": {"value": 562.0},
                    "calcium": {"value": 0.0},
                    "iron": {"value": 45.0}
                }, {
                    "name": "Donut",
                    "type": "Pastry",
                    "calories": {"value": 452.0},
                    "fat": {"value": 25.0},
                    "carbs": {"value": 51.0},
                    "protein": {"value": 4.9},
                    "sodium": {"value": 326.0},
                    "calcium": {"value": 2.0},
                    "iron": {"value": 22.0}
                }, {
                    "name": "KitKat01",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }, {
                    "name": "KitKat02",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }, {
                    "name": "KitKat03",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }, {
                    "name": "KitKat04",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }, {
                    "name": "KitKat05",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }, {
                    "name": "KitKat06",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                },
                , {
                    "name": "KitKat06",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }
                , {
                    "name": "KitKat06",
                    "type": "Candy",
                    "calories": {"value": 518.0},
                    "fat": {"value": 26.0},
                    "carbs": {"value": 65.0},
                    "protein": {"value": 7.0},
                    "sodium": {"value": 54.0},
                    "calcium": {"value": 12.0},
                    "iron": {"value": 6.0}
                }
            ]
        };

        $scope.editComment = function (event, dessert) {
            event.stopPropagation(); // in case autoselect is enabled

            var editDialog = {
                modelValue: dessert.comment,
                placeholder: 'Add a comment',
                save: function (input) {
                    if (input.$modelValue === 'Donald Trump') {
                        input.$invalid = true;
                        return $q.reject();
                    }
                    if (input.$modelValue === 'Bernie Sanders') {
                        return dessert.comment = 'FEEL THE BERN!'
                    }
                    dessert.comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Add a comment',
                validators: {
                    'md-maxlength': 30
                }
            };

            var promise;

            if ($scope.options.largeEditDialog) {
                promise = $mdEditDialog.large(editDialog);
            } else {
                promise = $mdEditDialog.small(editDialog);
            }

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        };

        $scope.toggleLimitOptions = function () {
            $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
        };

        $scope.getTypes = function () {
            return ['Candy', 'Ice cream', 'Other', 'Pastry'];
        };

        $scope.loadStuff = function () {
            $scope.promise = $timeout(function () {
                // loading
            }, 2000);
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

        // footer clock
        var tick = function() {
            $scope.clock = Date.now();
        };

        tick();

        $interval(tick, 1000);
    }]);
