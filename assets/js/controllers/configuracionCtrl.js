appCtrls.controller('configuracionCtrl', ['$scope', 'appService', 'Notification', '$window', function (scope, appService, Notification, $window) {

    scope.focus = function (id) {
        var element = $window.document.getElementById(id);
        element.focus();
    }

    scope.config = {};
    scope.aux = {};

    scope.getConfiguracion = function () {
        appService.get("configuracion_c/getConfiguracion").then(function (data) {

            if (data) {
                scope.config = data;
                scope.aux = angular.copy(data);
            }
        }, function (error) {
           Notification.error('Ha ocurrido un error, vuelva a intentar');
        });
    }

    scope.guardar = function () {
        if (!scope.configForm.$valid) {
            if (!scope.config.tasa) {
                Notification.error('No es posible continuar, debe ingresar Tasa es obligatorio.');
                scope.focus("tasa");

            } else if (!scope.config.porcentaje_enganche) {
                Notification.error('No es posible continuar, debe ingresar Enganche es obligatorio.');
                scope.focus("enganche");
            }
            else if (!scope.config.plazo) {
                Notification.error('No es posible continuar, debe ingresar Plazo es obligatorio.');
                scope.focus("plazo");
            }
            return;
        }

        appService.post("configuracion_c/guardarConfiguracion", scope.config).then(function (data) {
            if (data) {
                Notification.success('Bien Hecho. La configuración ha sido registrada.');
                scope.getConfiguracion();
                scope.focus("tasa");
            } else{
                Notification.error('Ha ocurrido un error, vuelva a intentar');
                scope.focus("tasa");
            }
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar');
            scope.focus("tasa");
        });
    }

    scope.cancelar = function () {
        scope.config = angular.copy(scope.aux);
    }

    scope.getConfiguracion();
    scope.focus("tasa");

}])