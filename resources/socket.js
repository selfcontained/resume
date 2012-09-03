(function() {
	var socket = io.connect('http://resume.selfcontained.us');

	socket.on('connect', function(data) {
		console.log('connected client', data);
	});
	socket.on('stats', function (data) {
		console.log('stats fired: ', data);
		$('#connections span').html(data.connections);
		$('#memory span').html(data.memory+' mb');
	});

	$(window).on('beforeunload', function() {
		console.log('test');
		socket.disconnect();
	});
})();
