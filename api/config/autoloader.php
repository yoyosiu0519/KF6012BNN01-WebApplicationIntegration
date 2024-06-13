<?php
/**
 * Autoloader function
 * 
 * 
 * This function is used to autoload classes.
 * 
 * @author Pik Sum Siu
 */

function autoloader($className) {
    $filename = $className . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        throw new Exception("File '$filename' not found");
    }
}