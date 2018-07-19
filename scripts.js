$( document ).ready(function() {
    $("#submit").click(submitMemberNumber);
});

function submitMemberNumber() {
	var memberNumber = $("#memberNumber").val();
	$.get( "endpoint.php?memberNumber=" + memberNumber, function( data ) {
		alert( "Load was performed." + data );
		var suggestedProducts = JSON.parse(data);
		for(var i = 0; i < suggestedProducts.length; i++) {
			alert(i + " " + suggestedProducts[i]);
		}
	});
}