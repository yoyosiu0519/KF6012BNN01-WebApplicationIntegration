<?php
/**
 * Exception handler function
 * 
 * 
 * This function is used to handle exceptions.
 * 
 * @author Pik Sum Siu
 */

function exceptionHandler($e) {
   http_response_code(500);
   $output['message'] = "Internal Server Error";
   $output['details']['exception'] = $e->getMessage();
   $output['details']['file'] = $e->getFile();
   $output['details']['line'] = $e->getLine();
   echo json_encode($output);
   exit();
}