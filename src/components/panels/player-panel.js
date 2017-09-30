import { Player } from "src/components/player/player";
import React from "react";
import PropTypes from "prop-types";

export const PlayerPanel = ({ onPlayerLoaded }) => (
	<div className="panel panel-default">
		<div className="panel-heading">
			<h4>Video Player</h4>
		</div>
		<div className="panel-body">
			<Player onPlayerLoaded={onPlayerLoaded} />
		</div>
	</div>
);

PlayerPanel.propTypes = {
	onPlayerLoaded: PropTypes.func,
};
