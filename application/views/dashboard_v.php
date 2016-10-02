<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Vendimia</title>

    <link rel="stylesheet" href="<?=base_url('assets/bower_components/bootstrap/dist/css/bootstrap.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/font-awesome.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('assets/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css');?>">
    <link rel="stylesheet" href="<?=base_url('assets/bower_components/angular-ui-select/dist/select.css');?>">
    <link rel="stylesheet" href="<?=base_url('assets/css/style.css');?>">
</head>
<body ng-app="app">

    <nav class="navbar navbar-inverse" ng-controller="dashboardCtrl">
        <div class="container-fluid">
            <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Vendimia</a>
            </div>


            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Inicio <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li><a ui-sref="ventas">Ventas</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a ui-sref="clientes">Clientes</a></li>
                    <li><a ui-sref="articulos">Articulos</a></li>
                    <li><a ui-sref="configuracion">Configuración</a></li>
                </ul>
                </li>
            </ul>
            <p class="navbar-text navbar-right">Fecha: {{date | date:'dd-MM-yyyy'}}</p>
            </div>
    </nav>

    <div ui-view class="container">
    </div>

    <script type="text/javascript" src="<?=base_url('assets/bower_components/jquery/dist/jquery.min.js');?>"></script> 
    <script type="text/javascript" src="<?=base_url('assets/bower_components/bootstrap/dist/js/bootstrap.min.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/bower_components/angular/angular.min.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/bower_components/angular-ui-router/release/angular-ui-router.min.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/bower_components/angular-sanitize/angular-sanitize.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/bower_components/angular-ui-select/dist/select.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/bower_components/angular-modal-service/dst/angular-modal-service.min.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/app.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/routes.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/directives.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/services.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers/dashboardCtrl.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers/ventasCtrl.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers/configuracionCtrl.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers/clientesCtrl.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers/articulosCtrl.js');?>"></script>
    <script type="text/javascript" src="<?=base_url('assets/js/controllers/YesNoController.js');?>"></script>
</body>
</html>