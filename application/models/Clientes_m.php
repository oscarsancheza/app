<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Clientes_m extends CI_Model{
    public function __construct(){
        parent::__construct();
    }

    public function ultimoID(){
        $result = $this->db->select_max('id_cliente')->get('clientes')->row();
        return $result;
    }

    public function getClientes(){
        $result = $this->db->get('clientes')->result();
        $index=0;
        foreach($result as &$item)
        {
            $item->index = $index++;
        }
        return $result;
    }

    public function guardarCliente($post) {
        $editar=$post['editar'];
        unset($post['editar']);
        unset($post['index']);
        if($editar == 1){
          $id = $post['id_cliente']; 
          unset($post['id_cliente']);
          $result = $this->db->where('id_cliente', $id)->update('clientes', $post);
        }else{
           $result = $this->db->insert('clientes',$post);
        }
        return $result;
    }

}