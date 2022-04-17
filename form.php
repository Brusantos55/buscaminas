<?php
//conectar base de datos
$host = 'localhost';
$db = 'buscaminas';
$user = 'root';
$password = '';

$dsn = "mysql:host=$host;dbname=$db;charset=UTF8";

$pdo = new PDO($dsn, $user, $password);
 

//extraer datos print_r($_POST);
$name=$_POST['name'];
$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];
//TODO validaciones


//crear usuario
$sql = 'INSERT INTO users (name,username,email,password)
        VALUES(:name,:username,:email,:password);';

$sth = $pdo->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute(array(':name'=>$name, ':username'=>$username,':email'=>$email,':password'=>$password));

//inicio sesion
session_start();
$_SESSION['username']=$username;
$_SESSION['name']=$name;
$_SESSION['email']=$email;

//dar respuesta
header('Location: play.html');