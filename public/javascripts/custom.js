var jug;
$(document).ready(function() {
	jug = new Juggernaut({port: 3000});
	var log = $('#console');
	console.log(jug);
  jug.on("connect", function(){jug.publish("juggernaut-channel", "<br />"+jug.sessionID+" connected")});
  jug.subscribe("juggernaut", function(data){
    log.append("<br />Got data: " + data);
  });
	jug.on("disconnect", function() { log.append("<br />"+jug.sessionID+" disconnected.")})
	$('form').submit(function() {
		jug.publish($("#channelname").val(),$("#messagebody").val());
		return false;
	});
	jug.on('message', function(message) {
		console.log(message);
	});
});