angular.module('SamoaApp')
    .controller('ProductFormController', ['$scope', '$log', '$mdDialog', 'product', function ($scope, $log, $mdDialog, product) {
        'use strict';

        var vm = this;

        // initialize form bound data
        vm.product = {};

        // bound select user if is defined
        if (angular.isDefined(product))
            vm.product = product;

        // Form event Handlers
        vm.saveDialog = saveDialog;
        vm.cancelDialog = cancelDialog;

        function saveDialog() {
            $mdDialog.hide(product);
        }

        function cancelDialog() {
            $mdDialog.cancel();
        }
    }]);
