const client = new ApiAi.ApiAiClient({accessToken: '57d408f6d9554cf58d471067a2d01feb'});

$( document ).ready(function() {
	$("#submitMemberNumber").click(submitMemberNumber);
	
	$("#submitChatbotInputText").click(submitChatbotInputText);

	$("#startChatSurvey").click(startChatSurvey);
});

function startChatSurvey() {
	const promise = client.textRequest("Start");

	$("#chatbotBox").show();
	$("#startChatSurvey").hide();

	promise
		.then(handleResponse)
		.catch(handleError);

	function handleResponse(serverResponse) {
			console.log(serverResponse);
			$("#chatbotQuestion").empty();
			$("#chatbotQuestion").append(serverResponse.result.fulfillment.speech);
	}
	function handleError(serverError) {
			console.log(serverError);
	}
}

function submitChatbotInputText(){
	var chatbotInputText = $("#chatbotInputText").val();

	$("#chatbotInputText").val("");
	
	const promise = client.textRequest(chatbotInputText);

	promise
		.then(handleResponse)
		.catch(handleError);

	function handleResponse(serverResponse) {
			console.log(serverResponse);
			$("#chatbotQuestion").empty();
			$("#chatbotQuestion").append(serverResponse.result.fulfillment.speech);

			if(!serverResponse.result.actionIncomplete) {
				if(serverResponse.result.parameters.moving == "Yes") {
					$.get( "http://localhost:3000/mockMovingServicesInformation/", function( data ) {
						console.log(data);
						var suggestedProducts = data;

						var suggestedProductsContainer = $("#icons2");
						suggestedProductsContainer.empty();
						for(var i = 0; i < suggestedProducts.length; i++) {
							var suggestedProductHTML = '<a href=' + suggestedProducts[i].link + ' target="_blank">';
							suggestedProductHTML += '<div class="well">';
							suggestedProductHTML += '<p>'+ suggestedProducts[i].serviceName +'</p>';

							var image = "";
							if(suggestedProducts[i].serviceName == "PODS Moving & Storage") {
								image = "pod.png";
							} else if(suggestedProducts[i].serviceName == "Flood Insurance") {
								image = "flood.jpg";
							} else if(suggestedProducts[i].serviceName == "Life Insurance") {
								image = "life.jpg";
							} else if(suggestedProducts[i].serviceName == "ADT Security Services") {
								image = "adt.png";
							}
							suggestedProductHTML += ' <img id="image" src="'+ image +'">';
							
							suggestedProductHTML += '<figcaption>'+ suggestedProducts[i].description +'</figcaption>';
							suggestedProductHTML += '</div>';
							suggestedProductHTML += '</a>';
							suggestedProductsContainer.append(suggestedProductHTML);

							console.log(suggestedProducts[i].category);
							if(suggestedProducts[i].category == "Moving") {
								$('#movingCategory').css("border-color","#223047");
								$('#movingCategory').css("border-width","2px");
								$('#movingCategory').css("background-color","lightgray");
							}
						}
					});
				}

				if(serverResponse.result.parameters['baby-life-event'] == "Yes") {
					$('#babyCategory').css("border-color","#223047");
					$('#babyCategory').css("border-width","2px");
					$('#babyCategory').css("background-color","lightgray");
				}
			}
	}
	function handleError(serverError) {
			console.log(serverError);
	}
}

function submitMemberNumber() {
	var memberNumber = $("#memberNumber").val();

	$('#icons .well').css("background-color","#f5f5f5");
	$('#icons .well').css("border","1px solid #e3e3e3");

	$.get( "http://localhost:3000/memberSuggestedProducts/" + memberNumber, function( data ) {
		console.log(data);
		var suggestedProducts = data;

		var suggestedProductsContainer = $("#icons2");
		suggestedProductsContainer.empty();
		for(var i = 0; i < suggestedProducts.length; i++) {
			var suggestedProductHTML = '<a href=' + suggestedProducts[i].link + ' target="_blank">';
			suggestedProductHTML += '<div class="well">';
			suggestedProductHTML += '<p>'+ suggestedProducts[i].serviceName +'</p>';

			var image = "";
			if(suggestedProducts[i].serviceName == "PODS Moving & Storage") {
				image = "pod.png";
			} else if(suggestedProducts[i].serviceName == "Flood Insurance") {
				image = "flood.jpg";
			} else if(suggestedProducts[i].serviceName == "Life Insurance") {
				image = "life.jpg";
			} else if(suggestedProducts[i].serviceName == "ADT Security Services") {
				image = "adt.png";
			}
			suggestedProductHTML += ' <img id="image" src="'+ image +'">';
			
			suggestedProductHTML += '<figcaption>'+ suggestedProducts[i].description +'</figcaption>';
			suggestedProductHTML += '</div>';
			suggestedProductHTML += '</a>';
			suggestedProductsContainer.append(suggestedProductHTML);

			console.log(suggestedProducts[i].category);
			if(suggestedProducts[i].category == "Moving") {
				$('#movingCategory').css("border-color","#223047");
				$('#movingCategory').css("border-width","2px");
				$('#movingCategory').css("background-color","lightgray");
			}
		}
	});
}