<?php
namespace App\EndpointControllers;
/**
 * Content class endpoint class
 *
 * This class will take in 'page' and 'type' as parameters and 
 * return the content information for a given content type and a pagination iimit.
 *
 * @author Pik Sum Siu
 */

class Content extends Endpoint
{
    protected $allowedParams = ["page", "type"];
    private $sql = "SELECT
                        content.id,
                        content.title,
                        type.name AS type,
                        content.abstract,
                        award.name AS award
                    FROM
                        type
                    JOIN
                        content ON (type.id = content.type)
                    LEFT JOIN
                        content_has_award ON (content.id = content_has_award.content)
                    LEFT JOIN
                        award ON (content_has_award.award = award.id)";

    private $sqlParams = [];
 
    public function __construct()
    {
        
        switch(\App\Request::method()) 
        {
            case 'GET':
                $this->checkAllowedParams();
                $this->buildSQL();
                $dbConn = new \App\Database(CHI_DATABASE);
                $data = $dbConn->executeSQL($this->sql, $this->sqlParams); 
                break;
            default:
                throw new \App\ClientError(405);
        }
 
        parent ::__construct($data);
    }
 
    private function buildSQL()
    {
        $where = false;
        $paginationLimit = 20;
        $orderBy = " ORDER BY title, type";
        $limit = "";
    
        $params = array_change_key_case(\App\Request::params(), CASE_LOWER);

        if (isset($params['page'])) 
        {
            $page = $params['page'];
            $offset = ($page - 1) * $paginationLimit;
            $this->sql .= ($where) ? " AND" : " WHERE";
            $where = true;
            $this->sql .= " 1=1"; 
            $limit = " LIMIT :limit OFFSET :offset";
            $this->sqlParams[":limit"] = $paginationLimit;
            $this->sqlParams[":offset"] = $offset;
        }
        
        if (isset($params['type'])) 
        {
            $this->sql .= ($where) ? " AND" : " WHERE";
            $where = true;
            $this->sql .= " type.name LIKE :type";
            $this->sqlParams[':type'] = $params['type'];
        }
        
       
        $this->sql .= $orderBy . $limit;
    }
}