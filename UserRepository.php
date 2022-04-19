<?php

include_once "DatabaseSingleton.php";
include_once "User.php";

class UserRepository{
    public $db;
    public $user;

    public function __construct(DatabaseSingleton $db, User $user){
        $this->db=$db;
        $this->user=$user;
    }
    public function createUser(){
        $sql = 'INSERT INTO users (name,username,email,password)
        VALUES(:name,:username,:email,:password);';

        $sth = $this->db->pdo->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        $sth->execute([
            ':name' => $this->user->getName(), 
            ':username' => $this->user->getUsername(),
            ':email' => $this->user->getEmail(),
            ':password' => $this->user->getPassword()
        ]);

    }
}

