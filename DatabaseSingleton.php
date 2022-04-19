<?php

class DatabaseSingleton {

    static private $instance;

    private $host = 'localhost';
    private $db = 'buscaminas';
    private $user = 'root';
    private $password = '';
    public $pdo;
    

    public function __construct(){
        
        if (!isset(self::$instance)) {

            $dsn = "mysql:host=$this->host;dbname=$this->db;charset=UTF8";
        
            $this->pdo = new PDO($dsn, $this->user, $this->password);
            
            self::$instance = $this;
        }

        return self::$instance;

    }
}


