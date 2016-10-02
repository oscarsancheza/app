appCtrls.controller('ventasCtrl', ['$scope', 'appService', 'Notification', '$window', 'ModalService', function (scope, appService, Notification, $window, ModalService) {

    scope.inicio = function () {
        scope.venta = { editar: 0, enganche: null, bonificacion: null, total: null, cantidad: [], totalapagar: [], ahorro: [], abono: [], articulos: [], cantidadArticulos: [], totalArticulos: [] };
        scope.ventas = [];
        scope.clientes = [];
        scope.articulos = [];
        scope.showventas = true;
        scope.articuloVenta = [];
        scope.config = [];
        scope.btnventa = false;
        scope.abonos = [{ index: 0, abono: 3 }, { index: 1, abono: 6 }, { index: 2, abono: 9 }, { index: 3, abono: 12 }];
    }


    scope.focus = function (id) {
        var element = $window.document.getElementById(id);
        element.focus(id);
    }

    scope.ultimoID = function () {
        appService.get("ventas_c/ultimoID").then(function (data) {
            if (data.folio)
                scope.venta.folio = data.folio + 1;
            else
                scope.venta.folio = 1;

            scope.showventas = false;
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        })
    }


    scope.getVentas = function () {
        appService.get("ventas_c/getVentas").then(function (data) {
            if (data)
                scope.ventas = data;
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        });
    }


    scope.itemArray = [
        { id: 1, name: 'first' },
        { id: 2, name: 'second' },
        { id: 3, name: 'third' },
        { id: 4, name: 'fourth' },
        { id: 5, name: 'fifth' },
        { id: 6, name: 'fifth' },
        { id: 7, name: 'fifth' },
        { id: 8, name: 'fifth' },
    ];

    scope.showYesNo = function () {
        ModalService.showModal({
            templateUrl: "assets/templates/yesno.html",
            controller: "YesNoController"
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                if (result){
                    scope.inicio();
                    scope.getClientes();
                    scope.getArticulos();
                    scope.getConfiguracion();
                    scope.getVentas();
                }

            });
        });
    };

    scope.getClientes = function () {
        appService.get("clientes_c/getClientes").then(function (data) {
            if (data)
                scope.clientes = data;
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

    scope.getConfiguracion = function () {
        appService.get("configuracion_c/getConfiguracion").then(function (data) {
            if (data) {
                scope.config = data;
            }
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar');
        });
    }

    scope.agregarArticulo = function (item) {
        if (item) {
            if (item.existencia > 0) {
                if (scope.articuloVenta.indexOf(item) === -1) {
                    item.preciofinal = item.precio * (1 + (scope.config.tasa * scope.config.plazo) / 100);
                    scope.articuloVenta.push(item);
                    setTimeout(function () { scope.focus('cantidad' + item.index); }, 0);
                }
            } else
                Notification.error('El artículo seleccionado no cuenta con existencia, favor de verificar.');

        }
    }

    scope.sacarImporte = function (item) {
        if (scope.venta.cantidad[item.index] > item.existencia) {
            Notification.error('El artículo solo cuenta con ' + item.existencia + ' de existencia');
            scope.venta.cantidad[item.index] = null;
        } else {
            item.importe = item.preciofinal * scope.venta.cantidad[item.index];
        }

        scope.bonificacionEnganche(scope.enganche(scope.importeGeneral()));
        scope.totalVenta(scope.importeGeneral());
    }

    scope.enganche = function (importe) {
        scope.venta.enganche = (scope.config.porcentaje_enganche / 100) * importe;
        return scope.venta.enganche;
    }

    scope.importeGeneral = function () {
        var importe = 0;
        angular.forEach(scope.articuloVenta, function (value, key) {
            importe += (value.importe) ? value.importe : 0;
        });
        return importe;
    }

    scope.bonificacionEnganche = function (enganche) {
        scope.venta.bonificacion = enganche * ((scope.config.tasa * scope.config.plazo) / 100)
        return scope.venta.bonificacion;
    }

    scope.totalVenta = function (importe) {
        scope.venta.total = importe - scope.venta.enganche - scope.venta.bonificacion;
    }

    scope.eliminarArticulo = function (item) {
        if (scope.venta.cantidad)
            scope.venta.cantidad[item.index] = null;
        scope.articuloVenta.splice(scope.articuloVenta.indexOf(item), 1);
        scope.bonificacionEnganche(scope.enganche(scope.importeGeneral()));
        scope.totalVenta(scope.importeGeneral());
    }

    scope.siguiente = function () {
        if (!scope.venta.clienteselected || !scope.venta.total) {
            Notification.error('Los datos ingresados no son correctos, favor de verificar');
            return;
        }

        else if (scope.articuloVenta || scope.articuloVenta.length == 0) {
            var aux = true;
            if (scope.articuloVenta.length == 0) {
                Notification.error('Los datos ingresados no son correctos, favor de verificar');
                return;
            }
            $.each(scope.articuloVenta, function (key, value) {
                if (scope.venta.cantidad) {
                    if (scope.venta.cantidad[value.index] == 0 || !scope.venta.cantidad[value.index]) {
                        Notification.error('Los datos ingresados no son correctos, favor de verificar');
                        aux = false;
                        return false;
                    }
                } else {
                    Notification.error('Los datos ingresados no son correctos, favor de verificar');
                    aux = false;
                    return false;
                }
            });
            if (!aux)
                return;
        }

        scope.btnventa = true;
        var preciocontado = 0;
        preciocontado = scope.venta.total / (1 + ((scope.config.tasa * scope.config.plazo) / 100));
        scope.getAbonos(preciocontado);
    }

    scope.getAbonos = function (preciocontado) {
        angular.forEach(scope.abonos, function (value, key) {
            scope.venta.totalapagar[value.index] = preciocontado * (1 + (scope.config.tasa * value.abono) / 100);
            scope.venta.abono[value.index] = scope.venta.totalapagar[value.index] / value.abono;
            scope.venta.ahorro[value.index] = scope.venta.total - scope.venta.totalapagar[value.index];
        });

        scope.venta.abonosmensuales = 1;
    }

    scope.guardar = function () {
        if (!scope.venta.abonosmensuales) {
            Notification.error('Los datos ingresados no son correctos, favor de verificar');
            return;
        }
        scope.venta.id_cliente = scope.venta.clienteselected.id_cliente;
        scope.venta.plazos = scope.abonos[scope.venta.abonosmensuales - 1].abono;
        angular.forEach(scope.articuloVenta, function (value, key) {
            scope.venta.articulos[key] = value.id_articulo;
            scope.venta.cantidadArticulos[key] = value.existencia - parseInt(scope.venta.cantidad[value.index]);
            scope.venta.totalArticulos[key] = parseInt(scope.venta.cantidad[value.index]);
        });

        appService.post('ventas_c/guardarVenta', scope.venta).then(function (data) {
            if (data) {
                scope.inicio();
                scope.getClientes();
                scope.getArticulos();
                scope.getConfiguracion();
                scope.getVentas();
                Notification.success('Bien Hecho, Tu venta ha sido registrada correctamente');
            } else {
                Notification.error('Ha ocurrido un error, vuelva a intentar.');
                scope.ultimoID();
            }
        }, function (error) {
            Notification.error('Ha ocurrido un error, vuelva a intentar.');
        });
    }

    scope.inicio();
    scope.getClientes();
    scope.getArticulos();
    scope.getConfiguracion();
    scope.getVentas();

}])