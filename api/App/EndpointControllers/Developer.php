<?php
namespace App\EndpointControllers;
/**
 * Developer endpoint class
 *
 * This class will return the developer's name and student ID
 * 
 *
 * @author Pik Sum Siu
 */

class Developer extends Endpoint
{
    public function __construct()
    {
        switch(\App\Request::method()) {
            case 'GET':
                $data['id'] = "w20012367";
                $data['name'] = "Pik Sum Siu";
                break;
        default:
            throw new \App\ClientError(405);
        }
        parent::__construct($data);
    }
}