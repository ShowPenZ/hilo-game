import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import routes from './routes';
import Index from './src/page/index/Index.jsx';

ReactDOM.render(<Index />, document.getElementById('root'));

// if (module.hot) {
// 	module.hot.accept(Index, () => {
// 		const newRoutes = require(Index).default;
// 		render(newRoutes);
// 	});
// }
if (module.hot) {
	module.hot.accept('./src/page/index/Index.jsx', () => {
		const App = require('./src/page/index/Index.jsx').default;
		renderDom(App);
	});
}
