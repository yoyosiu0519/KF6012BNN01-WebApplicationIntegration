<?php
namespace App\EndpointControllers;
/**
 * Endpoint class
 *
 * This class  is responsible for handling data and parameters 
 * for different endpoints in a web application
 * 
 *
 * @author Pik Sum Siu
 */

class Endpoint 
{
    private $data;
    protected $allowedParams = [];
 
    public function __construct($data = ["message" => []])
    {
        $this->setData($data);
    }
 
    public function setData($data)
    {
        $this->data = $data;
    }
 
    public function getData()
    {
        return $this->data;
    }

    protected function checkAllowedParams()
    {
        $params = array_change_key_case(\App\Request::params(), CASE_LOWER);

        foreach ($params as $param => $value) {
            if (!in_array($param, $this->allowedParams)) {
                throw new \App\ClientError(422);
            }
        }
    }
}