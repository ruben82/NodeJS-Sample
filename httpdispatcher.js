var HttpDispatcher = function() {

	this.listeners = {
		get : [],
		post : []
	};
	this.errorListener = function() {
	}
}

HttpDispatcher.prototype.on = function(method, url, cb) {

	this.listeners[method][url] = cb;
}

HttpDispatcher.prototype.onGet = function(url, cb) {
	this.on('get', url, cb);
}

HttpDispatcher.prototype.onPost = function(url, cb) {
	this.on('post', url, cb);
}

HttpDispatcher.prototype.onError = function(cb) {
	this.errorListener = cb;
}

HttpDispatcher.prototype.dispatch = function(req, res) {

	var parsedUrl = require('url').parse(req.url, true);
	var method = req.method.toLowerCase();

	if(this.listeners[method][parsedUrl.pathname])
		this.listeners[method][parsedUrl.pathname](req, res)
	else
		this.errorListener(req, res);
}

module.exports = new HttpDispatcher();
