<?php
namespace App\EndpointControllers;
/**
 * Author and affiliation endpoint class
 *
 * This class will take in 'content' and 'country' as parameters and 
 * return the author and affiliation information for a given content id.
 *
 * @author Pik Sum Siu
 */

class AuthorAndAffiliation extends Endpoint
{
    protected $allowedParams = ["content", "country"];
    private $sql = "SELECT
                        author.id AS author_id, author.name AS author_name, affiliation.institution, affiliation.country,
                        affiliation.city, affiliation.content AS content_id, content.title AS content_title
                    FROM
                        author
                    JOIN
                        content_has_author ON (author.id = content_has_author.author)
                    JOIN
                        content ON (content_has_author.content = content.id)
                    JOIN
                        affiliation ON (content_has_author.content = affiliation.content AND content_has_author.author = affiliation.author)";

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
 
        parent::__construct($data);
    }
 
    private function buildSQL()
    {
        $params = array_change_key_case(\App\Request::params(), CASE_LOWER);

        if (isset($params['content'])) 
        {
            if (!is_numeric($params['content'])) {
                throw new \App\ClientError(422);
            }
            $this->sql .= " WHERE affiliation.content = :content";
            $this->sqlParams[":content"] = $params['content'];
        }

        if (isset($params['country']))
        {
            $this->sql .= "WHERE affiliation.country LIKE :country";
            $this->sqlParams[':country'] = $params['country'];
        }
    }
 
}