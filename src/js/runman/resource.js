var LoadQueue = require('../hilo/loader/LoadQueue');
var mediator = require('./mediator');

/**
 * @module runman/resource
 * @requires hilo/loader/LoadQueue
 * @requires runman/mediator
 */
var resource = {
	loadedRes: {},
	res: [
		{ id: 'fish', src: require('../../images/fish.png') },
		{ id: 'bg', src: require('../../images/bg.png') }
	],
	load: function() {
		var res = this.res;
		var loadedRes = this.loadedRes;

		var queue = (this.queue = new LoadQueue());
		queue.add(res);

		queue.on('complete', function() {
			var imgs = [];
			for (var i = 0; i < res.length; i++) {
				var id = res[i].id;
				loadedRes[id] = queue.getContent(id);
			}
			mediator.fire('resource:complete');
		});

		queue.on('load', function(d) {
			mediator.fire('resource:loaded', {
				num: queue._loaded / (queue._source.length + 1)
			});
		});

		queue.start();
	},
	get: function(id) {
		return this.loadedRes[id];
	}
};

module.exports = resource;
