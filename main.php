<?php
include 'DbConnect.php';

$answer = json_decode($_POST['data'], true); // с формата JSON переводим в массив (false - в объект)
//$answer = $_POST['data'];
// header('Content-Type: application/json; charset=utf-8');
 //$toEcho = json_decode($answer);
// var_dump($_POST);
// exit();
      // echo($answer.' '.'werwe');
      // exit();
if ($answer == 'getTrainees') {
	$DB = DB::DbConnect(); //получили экземпляр объекта PDO
	$sql = "select * from TRAINEES";
	$res = $DB->query($sql);

	print_r(json_encode($res->fetchAll(PDO::FETCH_ASSOC)));
	exit();
} 
else 
{

 	foreach ($answer as $oper => $data) { // array( 0 => array(), 1 => array())
	/*	
 		$date  = $data['date'];
 		$ldap  = $data['login'];
 		$id    = $data['id'];
		
 		$var   = array('ldap' => $ldap, 'date'=>$date, 'id'=>$id );
 		$toReturn[] = $var;
	*/
		if( !(($oper +1) == count($answer)) ) { //последняя строка без union
			$SqlData .= " select '".$data['login']."','".$data['date']."',".$data['id']." union all";
		}else {
			$SqlData .= " select '".$data['login']."','".$data['date']."',".$data['id'];
		}
 	};

		 // echo $SqlData; 
		 // exit();
	// }

	//die();

	$sql = "insert into TRAINEES $SqlData";

	$DB = DB::DbConnect(); //получили экземпляр объекта PDO

	try{
		$res = $DB->exec($sql);	// exec данные на инсерт с возвратом количества затронутых строк, от 1 - иначе FALSE
	}catch (PDOException $e)
	{
		echo 'trhtrh';
	}

	if (!$res) {
		echo json_encode("Double"); // если запрос не выполнен (дубли, или другая ошибка) вернуть ответ в формате JSON
		exit();
	}

	echo(json_encode($res)); //количество затронутых строк - вернуть ответ в формате JSON
	exit();
};

//$res->setFetchMode(PDO::FETCH_ASSOC);
//$res->execute();

//print_r($res->fetchAll());
//var_dump(DB::DbConnect());
 //echo(json_encode($toReturn));

//echo $answer."WEDEW";