<?php

require("./DatabaseConnection.php");

$dao = new DatabaseConnection();

$memberNumber = $_GET['memberNumber'];

$isDeployed = $dao->getMemberDeploymentStatus($memberNumber);

$suggestedProducts = [];
if($isDeployed) {
	$deploymentProducts = $dao->getDeploymentProducts();
	foreach ($deploymentProducts as $product) {
		array_push($suggestedProducts,$product["PRODUCT_NAME"]);
	}
}



print_r($suggestedProducts);

?>