import "./player.css";

import React, { Component } from "react";

export const createComponentDidMount = (context) => () => {
	context.props.onPlayerLoaded(context._player);
};

export class Player extends Component {
	componentDidMount = createComponentDidMount(this);
	render() {
		return <video controls ref={(ref) => this._player = ref} />;
	}
}
