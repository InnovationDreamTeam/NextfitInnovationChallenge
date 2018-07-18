<?php
class DatabaseConnection {

	private $DB;

	public function __construct() {
		$db = 'mysql:dbname=innovation;host=127.0.0.1';
		$user = 'root';
		$password = '';
			
		try {
			$this->DB = new PDO ( $db, $user, $password );
			$this->DB->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
		} catch ( PDOException $e ) {
			echo ('Error establishing Connection');
			exit ();
		}
	}

	public function getMemberDeploymentStatus($memberNumber) {
		$sql = "SELECT DEPLOYED FROM MEMBER_INFO WHERE USAA_ID = :memberNumber;";
		$stmt = $this->DB->prepare( $sql );
		$stmt->execute( array(':memberNumber' => $memberNumber) );
		$row = $stmt->fetch( PDO::FETCH_ASSOC );

		if($row["DEPLOYED"] === "TRUE") {
			return true;
		} 

		return false;
	}

	public function getDeploymentProducts() {
		$sql = "SELECT PRODUCT_NAME FROM product JOIN life_event ON product.PRODUCT_ID = life_event.PRODUCT_ID WHERE EVENT_NAME = 'deployment'";
		$stmt = $this->DB->prepare( $sql );
		$stmt->execute();
		$rows = $stmt->fetchAll( PDO::FETCH_ASSOC );

		return $rows;
	}
}
?>