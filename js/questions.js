$(document).ready(function() {
	$("#qtnSubmit").click(function() {
		var questionsRef = new Firebase('https://glowing-fire-3188.firebaseio.com/questions/');
		var question = $("#question").val();
		questionsRef.push({text: question});
	});

	$(document).on('click', "button.respond", function() {
		var responsesRef = new Firebase('https://glowing-fire-3188.firebaseio.com/questions/' + $(this).attr("id") + '/responses/');
		var response = $("input[id=" + $(this).attr("id") + "]").val();
		var date = new Date().toISOString();
		responsesRef.push({text: response, date: date});
		$("input[id=" + $(this).attr("id") + "]").val('');
	});
});

var questionsRef = new Firebase('https://glowing-fire-3188.firebaseio.com/questions/');
questionsRef.on('child_added', function(snapshot) {
	$("button#qtnSubmit").after("<section class='animated fadeIn question_" + snapshot.name() + "'><div class='container'><h1>" + snapshot.val().text + "</h1></div></section>");
	$("section.question_" + snapshot.name()).after("<section class='responses_" + snapshot.name() + "'><input placeholder='your response' type='text' id=" + snapshot.name() + " /><button id=" + snapshot.name() + " class='respond btn btn-3 btn-3e'>Respond</button></section>");
	$("#question").val('');
	snapshot.ref().child('responses').on('child_added', function(response) {
		response = response.val();
		$("button#" + snapshot.name()).after("<p class='animated fadeInDown'>" + response.text + "</p>");
	});
});

questionsRef.off('child_added', function(snapshot) {});