angular.module('SamoaApp')
    .controller('InfraestructureFormController', ['$scope', '$log', '$mdDialog', 'infraestructure', function ($scope, $log, $mdDialog, infraestructure) {
        'use strict';

         var vm = this;

        // initialize form bound data
        vm.infraestructure = {};

        // bound select user if is defined
        if (angular.isDefined(infraestructure))
            vm.infraestructure = infraestructure;

        // Form event Handlers
        vm.saveDialog = saveDialog;
        vm.cancelDialog = cancelDialog;

        function saveDialog() {
            $mdDialog.hide(infraestructure);
        }

        function cancelDialog() {
            $mdDialog.cancel();
        }
}]);
