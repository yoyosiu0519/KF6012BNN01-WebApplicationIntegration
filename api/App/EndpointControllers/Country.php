<?php
namespace App\EndpointControllers;
/**
 * Country endpoint class
 *
 * This class will return a list of countries,, each country is returned only once.
 * 
 *
 * @author Pik Sum Siu
 */

class Country extends Endpoint
{
    private $sql = "SELECT DISTINCT country FROM affiliation ORDER BY country";

    public function __construct()
    {
        switch(\App\Request::method()) {
            case 'GET':
                
                $dbConn = new \App\Database(CHI_DATABASE);
                $data = $dbConn->executeSQL($this->sql); 
                break;
            default:
                throw new \App\ClientError(405);
        }
 
        parent::__construct($data);
    }

}