import React from 'react';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import Index from 'page/index/Index.jsx';

const routes = [
	{
		path: '/index',
		component: Index
	}
];

export default (
	<BrowserRouter>
		<Switch>
			<Redirect exact from="/" to="/index" />
			{routes.map((route, index) => {
				return (
					<Route
						key={index}
						path={route.path}
						render={props => <route.component {...props} routes={route.routes} />}
					/>
				);
			})}
			<Route path="*" component={NotFound} />
			{/* <Redirect from="*" to="/404" /> */}
		</Switch>
	</BrowserRouter>
);
