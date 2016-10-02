<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Articulos_m extends CI_Model{
    public function __construct(){
        parent::__construct();
    }

    public function ultimoID(){
        $result = $this->db->select_max('id_articulo')->get('articulos')->row();
        return $result;
    }

    public function getArticulos(){
        $result = $this->db->get('articulos')->result();
        $index=0;
        foreach($result as &$item)
        {
            $item->index = $index++;
        }
        return $result;
    }

    public function guardarArticulo($post) {
        $editar=$post['editar'];
        unset($post['editar']);
        unset($post['index']);
        if($editar == 1){
          $id = $post['id_articulo']; 
          unset($post['id_articulo']);
          $result = $this->db->where('id_articulo', $id)->update('articulos', $post);
        }else{
           $result = $this->db->insert('articulos',$post);
        }
        return $result;
    }

    public function existencia($post){
         $id = $post['id_articulo']; 
         unset($post['id_articulo']);
         $result = $this->db->where('id_articulo',$id)->update('articulos', $post);
    }

}