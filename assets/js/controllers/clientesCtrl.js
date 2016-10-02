appCtrls.controller('clientesCtrl', ['$scope', 'appService', 'Notification', '$window','ModalService', function (scope, appService, Notification, $window,ModalService) {

    scope.cliente = { apematerno:null,editar: 0 };
    scope.clientes = [];
    scope.showclientes = true;

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
                if (result){
                    scope.showclientes = true;
                    scope.cliente = { editar: 0 };
                    scope.getClientes();
                }
            });
        });
    };

    scope.ultimoID = function () {
        appService.get("clientes_c/ultimoID").then(function (data) {
            if (data.id_cliente)
                scope.cliente.id_cliente = data.id_cliente + 1;
            else
                scope.cliente.id_cliente = 1;

            scope.showclientes = false;
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        })
    }

    scope.cancelar = function () {
        scope.showclientes = true;
        scope.cliente = { editar: 0 };
    }


    scope.guardar = function () {
        if (!scope.clientesForm.$valid) {
            if (!scope.cliente.nombre) {
                Notification.error('No es posible continuar, debe ingresar Nombre es obligatorio.');
                scope.focus("nombre");

            } else if (!scope.cliente.apepaterno) {
                Notification.error('No es posible continuar, debe ingresar Apellido Paterno es obligatorio.');
                scope.focus("apepaterno");
            }
            else if (!scope.cliente.rfc) {
                Notification.error('No es posible continuar, debe ingresar RFC es obligatorio.');
                scope.focus("rfc");
            }
            return;
        }

        appService.post("clientes_c/guardarCliente", scope.cliente).then(function (data) {
            if (data) {
                Notification.success('Bien Hecho. El Cliente ha sido registrado correctamente.');
                scope.showclientes = true;
                scope.cliente = { editar: 0 };
                scope.getClientes();
            } else {
                Notification.error('Ha ocurrido un error, vuelva a intentar.');
                scope.ultimoID();
            }

        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        });
    }

    scope.getClientes = function () {
        appService.get("clientes_c/getClientes").then(function (data) {
            if (data)
                scope.clientes = data;
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        });
    }

    scope.editar = function (index) {
        scope.cliente = angular.copy(scope.clientes[index]); 
        scope.showclientes = false;
        scope.cliente.editar = 1;
    }

    scope.getClientes();
    scope.focus("nombre");
}])