<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Configuracion_m extends CI_Model{
    public function __construct(){
        parent::__construct();
    }

    public function getConfiguracion(){
        $result = $this->db->get('configuracion')->row();
        return $result;
    }

    public function guardarConfiguracion($post) {
        $this->db->empty_table('configuracion');
        return $this->db->insert('configuracion',$post);
    }

}