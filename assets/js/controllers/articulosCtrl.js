appCtrls.controller('articulosCtrl', ['$scope', 'appService', 'Notification', '$window','ModalService', function (scope, appService, Notification, $window,ModalService) {

    scope.articulo = { editar: 0 };
    scope.articulos = [];
    scope.showarticulos = true;

    scope.focus = function (id) {
        var element = $window.document.getElementById(id);
        element.focus();
    }

    scope.showYesNo = function () {
        ModalService.showModal({
            templateUrl: "assets/templates/yesno.html",
            controller: "YesNoController"
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                if (result) {
                    scope.showarticulos = true;
                    scope.articulo = { editar: 0 };
                    scope.getArticulos();
                }
            });
        });
    };

    scope.ultimoID = function () {
        appService.get("articulos_c/ultimoID").then(function (data) {
            if (data.id_articulo)
                scope.articulo.id_articulo = data.id_articulo + 1;
            else
                scope.articulo.id_articulo = 1;

            scope.showarticulos = false;
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        })
    }

    scope.cancelar = function () {
        scope.showarticulos = true;
        scope.articulo = { editar: 0 };
    }


    scope.guardar = function () {
        if (!scope.articulosForm.$valid) {
            if (!scope.articulo.descripcion) {
                Notification.error('No es posible continuar, debe ingresar Descripción es obligatorio.');
                scope.focus("descripcion");

            } else if (!scope.articulo.precio) {
                Notification.error('No es posible continuar, debe ingresar Precio es obligatorio.');
                scope.focus("precio");
            }
            else if (!scope.articulo.existencia) {
                Notification.error('No es posible continuar, debe ingresar Existencia es obligatorio.');
                scope.focus("existencia");
            }
            return;
        }

        appService.post("articulos_c/guardarArticulo", scope.articulo).then(function (data) {
            if (data) {
                Notification.success('Bien Hecho. El Articulo ha sido registrado correctamente.');
                scope.showarticulos = true;
                scope.articulo = { editar: 0 };
                scope.getArticulos();
            } else {
                Notification.error('Ha ocurrido un error, vuelva a intentar.');
                scope.ultimoID();
            }

        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        });
    }

    scope.getArticulos = function () {
        appService.get("articulos_c/getArticulos").then(function (data) {
            if (data)
                scope.articulos = data;
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        });
    }

    scope.editar = function (index) {
        scope.articulo = angular.copy(scope.articulos[index]);
        scope.showarticulos = false;
        scope.articulo.editar = 1;
    }

    scope.getArticulos();
    scope.focus("descripcion");
}])