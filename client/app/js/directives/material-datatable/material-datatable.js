angular.module('SamoaApp')
    .directive('materialDatatable', ['$log', function ($log) {
        'use strict';

        return {
            restrict: "E",
            replace: false,
            scope: {
                options: '=',
                query: '=',
                onLoadStuff: '&',
                onAddStuff: '&',
                onEditStuff: '&',
                onRemoveStuff: '&',
                onRemoveFilter:'&'
            },
            templateUrl: "app/js/directives/material-datatable/material-datatable-template.html",
            controller: ["$scope", function($scope) {
            }],
            link: function (scope, element, attrs) {

            }
        }
    }]);
