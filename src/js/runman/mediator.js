var EventMixin = require('../hilo/event/EventMixin');
var Class = require('../hilo/core/Class');

/**
 * @module runman/mediator
 * @requires hilo/event/EventMixin
 * @requires hilo/core/Class
 */
var mediator = Class.mix({}, EventMixin);

module.exports = mediator;