<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ventas_c extends CI_Controller {
	
	public function __construct(){
        parent::__construct();
        $this->load->model("ventas_m");
    }
 
	public function index()
	{
		//$this->load->view('dashboard_v');
	}

	public function guardarVenta() {
        $this->form_validation->set_rules('folio', 'folio', 'is_unique[ventas.folio]');
        if ($this->form_validation->run() == FALSE)
        {	
            return jsonNumeric(false);
        }
		$data = $this->ventas_m->guardarVenta($this->input->post());
    	jsonNumeric($data);
	}

	public function ultimoID(){
		$data = $this->ventas_m->ultimoID();
		jsonNumeric($data);
	}

	public function getVentas(){
		$data = $this->ventas_m->getVentas();
		jsonNumeric($data);
	}

}
