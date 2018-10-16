import React, { Component } from 'react';
const game = require('../../js/runman/game');

class Index extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		game.init(document.getElementById('stageContainer'));
	}

	render() {
		return (
			<div id="gameContainer">
				<div id="loading">loading...</div>
				<div id="stageContainer" />
			</div>
		);
	}
}

export default Index;
