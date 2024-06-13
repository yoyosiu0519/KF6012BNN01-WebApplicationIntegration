<?php
namespace App\EndpointControllers;
/**
 * Preview class
 *
 * This class will take in 'limit' as parameter and 
 * return the random content that has a preview video.
 * 
 *
 * @author Pik Sum Siu
 */

class Preview extends Endpoint
{
    protected $allowedParams = ["limit"];
    private $sql = "SELECT title, preview_video 
                    FROM content 
                    WHERE preview_video IS NOT NULL
                    ORDER BY RANDOM()";
    private $sqlParams = [];
 
    public function __construct()
    {
        switch(\App\Request::method()) {
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(CHI_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams); 
                break;
            default:
                throw new \App\ClientError(405);
        }
 
        parent::__construct($data);
    }
    
    private function buildSQL()
    {
        $params = array_change_key_case(\App\Request::params(), CASE_LOWER);
    
        if (isset($params['limit'])) {
            $limit = $params['limit'];
    
            if ($limit != 1 || !is_numeric($limit)) {
                throw new \App\ClientError(422);
            }
    
            $this->sql .= " LIMIT :limit";
            $this->sqlParams[":limit"] = $limit;
        }
    }

}