var os = require('os');

var Stats = function(app) {
	this.app = app;
	this.io = require('socket.io').listen(app);
	this.register();
	this.cpus = os.cpus().length;
};

Stats.prototype = {

	register : function() {
		var that = this;
		setInterval(function() {
			that.io.sockets.emit('stats', that.getStats());
		}, 5000);
		// this.io.sockets.on('connection', function(socket) { that.updateStats(socket); });
		// this.io.sockets.on('disconnect', function(socket) { that.updateStats(socket); });
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

	register : function(app) {
		return new Stats(app);
	}
};
