<?php

include_once "DatabaseSingleton.php";
include_once "UserRepository.php";
include_once "User.php";

$db = new DatabaseSingleton();
$pdo = $db->pdo;

$user = new User();


//extraer datos print_r($_POST);
$user->setName($_POST['name']);  
$user->setUsername($_POST['username']);  
$user->setPassword($_POST['password']);
$user->setEmail($_POST['email']);

$userRepository = new UserRepository($db, $user);
$userRepository->createUser();

//inicio sesion
session_start();
$_SESSION['username']=$username;
$_SESSION['name']=$name;
$_SESSION['email']=$email;

//dar respuesta
header('Location: play.html');