const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	console.log('proxy');
	app.use(proxy("/api", { target: "http://localhost:9001" }));
};