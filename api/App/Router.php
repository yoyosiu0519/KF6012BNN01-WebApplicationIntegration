<?php
namespace App;

/**
 * Router class 
 * 
 * 
 * This is an abstract class that provides a static method for managing 
 * the routing of HTTP requests within a PHP application. 
 * Used to route HTTP requests to the appropriate endpoint controllers based on the endpoint name
 * 
 * @author Pik Sum Siu
 */

abstract class Router
{
    public static function routeRequest()
    {
        try
         {
            $endpointName = strtolower(Request::endpointName());
            switch ($endpointName) 
            {
                case 'authorandaffiliation':
                case 'authorandaffiliation/':
                case 'author-and-affiliation':
                case 'author-and-affiliation/':
                    $endpoint = new EndpointControllers\AuthorAndAffiliation();
                    break;
                case 'content':
                case 'content/':
                    $endpoint = new EndpointControllers\Content();
                    break;
                case 'country':
                case 'country/':
                    $endpoint = new EndpointControllers\Country();
                    break;
                case 'developer':
                case 'developer/':
                    $endpoint = new EndpointControllers\Developer();
                    break;
                case 'preview':
                case 'preview/':
                    $endpoint = new EndpointControllers\Preview();
                    break;
                case 'token':
                case 'token/':
                    $endpoint = new EndpointControllers\Token();
                    break;
                case 'save':
                case 'save/':
                    $endpoint = new EndpointControllers\Save();
                    break;
                case 'note':
                case 'note/':
                    $endpoint = new EndpointControllers\Note();
                    break;
                default:
                    throw new ClientError(404);
            }
         } catch (ClientError $e) 
         {
            $data = ['message' => $e->getMessage()];
            $endpoint = new EndpointControllers\Endpoint($data);
         }

         
         return $endpoint;

    }

}