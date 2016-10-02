<?php


defined('BASEPATH') OR exit('No direct script access allowed');

class Configuracion_c extends CI_Controller {
	
	public function __construct(){
        parent::__construct();
        $this->load->model("configuracion_m");
    }
 
	public function index()
	{
		//$this->load->view('dashboard_v');
	}

	public function getConfiguracion(){
		$data = $this->configuracion_m->getConfiguracion();
		jsonNumeric($data);
	}

	public function guardarConfiguracion() {
		$data = $this->configuracion_m->guardarConfiguracion($this->input->post());
    	jsonNumeric($data);
	}

}
