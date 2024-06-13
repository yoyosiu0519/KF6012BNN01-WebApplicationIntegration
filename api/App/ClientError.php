<?php 
namespace App;
/**
 * Client error handling class
 *
 * This class will handle client errors and return error response.
 *
 * @author Pik Sum Siu
 */


class ClientError extends \Exception
{
    public function __construct($code)
    {
        parent::__construct($this->errorResponses($code));
    }
 
    public function errorResponses($code)
    {
        switch ($code) {
            case 401:
                http_response_code(401);
                $message = 'Unauthorised';
                break;
            case 404:
                http_response_code(404);
                $message = 'Endpoint Not Found';
                break;
            case 405:
                http_response_code(405);
                $message = 'Method Not Allowed';
                break;
            case 422:
                http_response_code(422);
                $message = 'Unprocessable Entity';
                break;
            default:
                throw new \Exception('Internal Server Error');
        }
        return $message;
    }
}