<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ventas_m extends CI_Model{
    public function __construct(){
        parent::__construct();
    }

    public function ultimoID(){
        $result = $this->db->select_max('folio')->get('ventas')->row();
        return $result;
    }

    public function getVentas(){
        $result = $this->db->join('clientes as c', 'v.id_cliente = c.id_cliente','INNER')->order_by("folio", "asc")->get('ventas as v')->result();
        return $result;
    }

    public function guardarVenta($post) {
        $data=array('folio'=>$post['folio'],'id_cliente'=>$post['id_cliente'],'total'=>$post['total'],'plazo_abono'=>$post['plazos']);
        $result = $this->db->insert('ventas',$data);

        if($result){
            $ultimoID=$post['folio'];
            $id_articulos = explode(",", $post['articulos']);
            $cantidad = explode(",", $post['cantidadArticulos']);
            $totalArticulos = explode(",", $post['totalArticulos']);

            for($i=0; $i<count($id_articulos);$i++){
                $detalle = array('id_producto'=>$id_articulos[$i],'cantidad' => $totalArticulos[$i],'folio_venta'=> $ultimoID);
                $result = $this->db->insert('detalle_venta',$detalle);
            }

            if($result){
                for($i=0; $i<count($id_articulos);$i++){
                    $result = $this->db->where('id_articulo',$id_articulos[$i])->update('articulos', array('existencia' => $cantidad[$i])); 
                }
            }else
                $result = false;
        }

        return $result;
    }

}