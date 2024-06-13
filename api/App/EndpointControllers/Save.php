<?php

namespace App\EndpointControllers;
/**
 * Save content to authenticated users
 *
 * This class will save contents for authenticated users. 
 * It handles GET, POST and DELETE requests.
 *
 * @author Pik Sum Siu
 */

 class Save extends Endpoint 
 {
     public function __construct(){

        $id = $this->validateToken();
  
         switch(\App\Request::method()) 
         {
             case 'GET':
                $data = $this->getSave($id);
                 break;
             case 'POST':
                $data = $this->postSave($id);
                 break;
             case 'DELETE':
                $data = $this->deleteSave($id);
                 break;
             default:
                 throw new \App\ClientError(405);
                 break;
         }
         parent::__construct($data);
     }

    private function validateToken(){

        $secretkey = SECRET;
                
        $jwt = \App\REQUEST::getBearerToken();
 
        try {
            $decodedJWT = \Firebase\JWT\JWT::decode($jwt, new \Firebase\JWT\Key($secretkey, 'HS256'));
        } catch (\Exception $e) {
            throw new \App\ClientError(401);
        }
 
        if (!isset($decodedJWT->exp) || !isset($decodedJWT->sub)) { 
            throw new \App\ClientError(401);
        }
 
        return $decodedJWT->sub;
    }

     private function getSave($id){
        $dbConn = new \App\Database(USER_DATABASE);
        $sqlParams = [':id' => $id];
        $sql = "SELECT content_id FROM save_content WHERE account_id = :id";
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }

    private function postSave($id)
    {
        if (!isset(\App\REQUEST::params()['content_id']))
        {
            throw new \App\ClientError(422);
        }
         
        if (!is_numeric(\App\REQUEST::params()['content_id']))
        {
            throw new \App\ClientError(422);
        }
         
        $content_id = \App\REQUEST::params()['content_id'];

        $dbConn = new \App\Database(USER_DATABASE);
 
        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $sql = "SELECT * FROM save_content WHERE account_id = :id AND content_id = :content_id";
        $data = $dbConn->executeSQL($sql, $sqlParams);
 
 
        if (count($data) === 0) {
            $sql = "INSERT INTO save_content (account_id, content_id) VALUES (:id, :content_id)";
            $data = $dbConn->executeSQL($sql, $sqlParams);
        }
        
        return [];
 
 
    }
    private function deleteSave($id)
    {
        if (!isset(\App\REQUEST::params()['content_id']))
        {
            throw new \App\ClientError(422);
        }
        
        if (!is_numeric(\App\REQUEST::params()['content_id']))
        {
            throw new \App\ClientError(422);
        }
         
        $content_id = \App\REQUEST::params()['content_id'];
        
 
        $dbConn = new \App\Database(USER_DATABASE);
        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $sql = "DELETE FROM save_content WHERE account_id = :id AND content_id = :content_id";
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }
 
 }
