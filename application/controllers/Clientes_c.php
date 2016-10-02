<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Clientes_c extends CI_Controller {
	
	public function __construct(){
        parent::__construct();
        $this->load->model("clientes_m");
    }
 
	public function index()
	{
		//$this->load->view('dashboard_v');
	}

	public function guardarCliente() {
		if($this->input->post('editar') != 1){
			$this->form_validation->set_rules('id_cliente', 'id_cliente', 'is_unique[clientes.id_cliente]');
			if ($this->form_validation->run() == FALSE)
			{	
				return jsonNumeric(false);
			}
		}

		$data = $this->clientes_m->guardarCliente($this->input->post());
    	jsonNumeric($data);
	}

	public function ultimoID(){
		$data = $this->clientes_m->ultimoID();
		jsonNumeric($data);
	}

	public function getClientes(){
		$data = $this->clientes_m->getClientes();
		jsonNumeric($data);
	}

}
