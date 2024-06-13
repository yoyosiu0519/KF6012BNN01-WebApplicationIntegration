<?php
 namespace App\EndpointControllers;
 /**
  * Content note endpoint limited to authorised users
  *
  * This endpoint is incharge of handling the content note requests, 
  * including GET and POST. Delete is not implemented as the POST request
  * will overwrite the existing note.
  *
  * @author Pik Sum Siu
  */

 
class Note extends Endpoint 
{
    public function __construct()
    {
        $id = $this->validateToken();
        
        $this->checkUserExists($id);
 
        switch(\App\Request::method()) 
        {
            case 'GET':
                $data = $this->getNote($id);
                break;
            case 'POST':
                $data = $this->postNote($id);
                break;
            case 'DELETE':
                $data = $this->deleteNote($id);
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
 
    private function note() 
    {
        if (!isset(\App\REQUEST::params()['note']))
        {
            throw new \App\ClientError(422);
        }
 
        if (mb_strlen(\App\REQUEST::params()['note']) > 250)
        {
            throw new \App\ClientError(422);
        }
 
       $note = \App\REQUEST::params()['note'];
       return htmlspecialchars($note);
    }
 
    private function getNote($id)
    {
        if (isset(\App\REQUEST::params()['content_id']))
        {
            $content_id = \App\REQUEST::params()['content_id'];
 
            if (!is_numeric($content_id))
            {
                throw new \App\ClientError(422);
            }
            $sqlParams = [':id' => $id, 'content_id' => $content_id];
            $sql = "SELECT * FROM content_note WHERE account_id = :id AND content_id = :content_id";
        } else {
            $sqlParams = [':id' => $id];
            $sql = "SELECT * FROM content_note WHERE account_id = :id";
            
        }
 
        $dbConn = new \App\Database(USER_DATABASE);
        
        $data = $dbConn->executeSQL($sql, $sqlParams);
        return $data;
    }
 
    private function postNote($id)
    {
        $content_id = \App\REQUEST::params()['content_id'];
        if (!isset($content_id))
        {
            throw new \App\ClientError(422);
        }
         
        if (!is_numeric($content_id))
        {
            throw new \App\ClientError(422);
        }
         
     
        $note = $this->note();
 
        $dbConn = new \App\Database(USER_DATABASE);
 
        $sqlParams = [':id' => $id, 'content_id' => $content_id];
        $sql = "SELECT * FROM content_note WHERE account_id = :id AND content_id = :content_id";
        $data = $dbConn->executeSQL($sql, $sqlParams);
 
        if (count($data) === 0) {
            $sql = "INSERT INTO content_note (account_id, content_id, note) VALUES (:id, :content_id, :note)";
        } else {
            $sql = "UPDATE content_note SET note = :note WHERE account_id = :id AND content_id = :content_id";
        }
 
        $sqlParams = [':id' => $id, 'content_id' => $content_id, 'note' => $note];
        $data = $dbConn->executeSQL($sql, $sqlParams);
     
        return [];
    }
 
    private function checkUserExists($id)
    {
        $dbConn = new \App\Database(USER_DATABASE);
        $sql = "SELECT id FROM account WHERE id = :id";
        $sqlParams = [':id' => $id];
        $data = $dbConn->executeSQL($sql, $sqlParams);
        if (count($data) != 1) {
            throw new \App\ClientError(401);
        }
    }
}