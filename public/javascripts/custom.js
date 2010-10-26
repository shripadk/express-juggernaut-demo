$(document).ready(function() {
	var jug = new Juggernaut({port: 3000});
	var log = $('#console');
	console.log(jug);
  jug.on("connect", function(){ log.append("<br />"+jug.sessionID+" connected") });
  jug.subscribe("juggernaut-channel", function(data){
    log.append("<br />Got data: " + data);
  });
	jug.on("disconnect", function() { log.append("<br />"+jug.sessionID+" disconnected.")})
	$('form').submit(function() {
		$.post($(this).action, $(this).serialize());
		return false;
	});
});
