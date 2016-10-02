<?php

function json($object){
	header("Content-type: application/json; charset=utf-8");
	echo json_encode($object);
}

function jsonNumeric($object){
	header("Content-type: application/json; charset=utf-8");
	echo json_encode($object,JSON_NUMERIC_CHECK);
}