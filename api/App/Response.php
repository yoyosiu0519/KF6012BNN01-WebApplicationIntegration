<?php
namespace App;
/**
 * Response class 
 * 
 * 
 * This class is used to send JSON responses with the appropriate headers.
 * 
 * @author Pik Sum Siu
 */

class Response
{
 
    public function __construct()
    {
        $this->outputHeaders();
        if (Request::method() == "OPTIONS") 
        {
            exit();
        }
    }
    
    private function outputHeaders()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Authorization, Content-Type");
        header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    }
 
    public function outputJSON($data)
    {
        echo json_encode($data);
    }
 
}