var os = require('os'),
	io = require('socket.io');

var Stats = function(server) {
	this.server = server;
	this.io = io.listen(server);
	this.register();
	this.cpus = os.cpus().length;
};

Stats.prototype = {

	register : function() {
		var that = this;
		this.io.sockets.on('connection', function(socket) { that.updateStats(socket); });
		this.io.sockets.on('disconnect', function(socket) { that.updateStats(socket); });
	},

	updateStats : function() {
		this.io.sockets.emit('stats', this.getStats());
	},

	getStats : function() {
		return {
			connections: this.io.sockets.clients().length,
			memory: (process.memoryUsage().rss/1048576).toFixed(2), //MB
			load : ((os.loadavg()[0].toFixed(2)/this.cpus)*100).toFixed(2)
		};
	}

};

module.exports = {

	register : function(server) {
		return new Stats(server);
	}
};
