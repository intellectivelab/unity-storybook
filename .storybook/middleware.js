const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
	const filter = function (pathname) {
		return pathname.match('^/api');
	};

	const formsFilter = (pathname) => pathname.match('^/forms-api');

	router.use(createProxyMiddleware(filter, {
		target: 'http://localhost:4000',
		pathRewrite: {'^/api/1.0.0': '/api'}
	}));

	router.use(createProxyMiddleware(formsFilter, {
		target: 'http://localhost:4000',
		pathRewrite: {'^/forms-api/1.0': '/api'}
	}));
}