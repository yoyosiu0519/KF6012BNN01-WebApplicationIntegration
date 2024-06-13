<?php
namespace App;

/**
 * Abstract class to get information about the http request.
 * 
 * The methods in this class are static so they can be called
 * without creating an instance of the class and handle HTTP requests in a PHP application.
 * 
 * @author Pik Sum Siu
 */

abstract class Request 
{
    public static function method()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
 
    public static function endpointName()
    {
        $url = $_SERVER["REQUEST_URI"];
        $path = parse_url($url)['path'];
        return str_replace(BASEPATH, "", $path);
    }
 
    public static function params()
    {
        return $_REQUEST;
    }
    
    public static function getBearerToken()
    {
        $allHeaders = getallheaders();
        $authorizationHeader = "";
                
        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['authorization'];
        }
                
        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new ClientError(401);
        }
        
        return trim(substr($authorizationHeader, 7));  
    }
    
}