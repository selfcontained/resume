(function() {
	var socket = io.connect('http://resume.selfcontained.us');

	socket.on('stats', function (data) {
		$('#connections span').html(data.connections);
		$('#memory span').html(data.memory+' mb');
	});

})();
