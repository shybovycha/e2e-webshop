// the whole application

var webshopApp = angular.module('WebshopApp', ['ngRoute', 'webshopControllers']);

webshopApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'partials/products.html',
                controller: 'IndexCtrl'
            })
            .when('/billing-details', {
                templateUrl: 'partials/billing-details.html',
                controller: 'BillingDetailsCtrl'
            })
            .when('/order-summary', {
                templateUrl: 'partials/order-summary.html',
                controller: 'OrderSummaryCtrl'
            })
            .otherwise({
                redirectTo: '/index'
            });
    }
]);

// services

webshopApp.factory('order', [function () {
    var orderData = {
        products: [],
        billingDetails: {},
        totalPrice: function () {
            var amount = this.products.reduce(function (acc, p) { return acc + p.price.amount }, 0),
                currency = this.products.reduce(function (_, p) { return p.price.currency; }, 'USD');

            return {
                amount: amount,
                currency: currency
            };
        },
        addProduct: function (product) {
            this.products.push(product);
        },
        checkOut: function () {
            this.products = [];
            this.billingDetails = {};
        }
    };

    return orderData;
}]);

// controllers

var webshopControllers = angular.module('webshopControllers', []);

webshopControllers.controller('IndexCtrl', ['$scope', '$location', 'order', function ($scope, $location, order) {
    $scope.products = [
        {
            title: 'iPhone 5S Black',
            price: {
                amount: 300.0,
                currency: 'USD'
            }
        },
        {
            title: 'iPhone 5S White',
            price: {
                amount: 310.0,
                currency: 'USD'
            }
        },
        {
            title: 'iPhone 6 White',
            price: {
                amount: 450.0,
                currency: 'USD'
            }
        }
    ];

    $scope.buy = function (product) {
        order.addProduct(product);
        $location.path('billing-details');
    };
}]);

webshopControllers.controller('BillingDetailsCtrl', ['$scope', '$location', 'order', function ($scope, $location, order) {
    $scope.billingDetails = {};

    $scope.submitOrder = function () {
        order.billingDetails = $scope.billingDetails;
        $location.path('order-summary');
    };
}]);

webshopControllers.controller('OrderSummaryCtrl', ['$scope', 'order', function ($scope, order) {
    $scope.order = order;
}]);


