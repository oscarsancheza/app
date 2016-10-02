<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Articulos_c extends CI_Controller {
	
	public function __construct(){
        parent::__construct();
        $this->load->model("articulos_m");
    }
 
	public function index()
	{
		//$this->load->view('dashboard_v');
	}

	public function guardarArticulo() {
		if($this->input->post('editar') != 1){
			$this->form_validation->set_rules('id_articulo', 'id_articulo', 'is_unique[articulos.id_articulo]');
			if ($this->form_validation->run() == FALSE)
			{	
				return jsonNumeric(false);
			}
		}

		$data = $this->articulos_m->guardarArticulo($this->input->post());
    	jsonNumeric($data);
	}

	public function ultimoID(){
		$data = $this->articulos_m->ultimoID();
		jsonNumeric($data);
	}

	public function getArticulos(){
		$data = $this->articulos_m->getArticulos();
		jsonNumeric($data);
	}

	public function existencia(){
		$data = $this->articulos_m->existencia($this->input->post());
    	jsonNumeric($data);
	}

}
