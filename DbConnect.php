<?php

/**
* Connect to DB
*/
class DB
{

	static function DbConnect() {

			try {
				//$pdo = new PDO('mysql:host=localhost;dbname=slimblog;charset=utf8', 'root', '');	
				$DB = new PDO('mysql:host=localhost;dbname=testDB;charset=utf8','root','');
				return $DB;			
			}
			catch(PDOException $e){
				return $e->getMessage();
			}
	}
}


?>