angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('ventas', {
        url: '/ventas',
        templateUrl: 'assets/templates/ventas.html',
        controller: 'ventasCtrl'
      })

      .state('configuracion', {
        url: '/configuracion',
        templateUrl: 'assets/templates/configuracion.html',
        controller: 'configuracionCtrl'
      })

      .state('clientes', {
        url: '/clientes',
        templateUrl: 'assets/templates/clientes.html',
        controller: 'clientesCtrl'
      })

      .state('articulos', {
        url: '/articulos',
        templateUrl: 'assets/templates/articulos.html',
        controller: 'articulosCtrl'
      })


    $urlRouterProvider.otherwise('/ventas')

  });