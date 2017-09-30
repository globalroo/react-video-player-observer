import React from "react";
import PropTypes from "prop-types";

export const createClickHandler = ({ loadAsset, asset }) => () => loadAsset(asset);

export const MovieButton = ({ asset, loadAsset }) => {
	const clickHandler = createClickHandler({ loadAsset, asset });
	return (
		<div className="btn-group" role="group">
			<button type="button" onClick={clickHandler} className="btn btn-info">{asset.name}</button>
		</div>
	);
};

MovieButton.propTypes = {
	loadAsset: PropTypes.func,
	asset: PropTypes.object
};

export const ControlsPanel = ({ availableMedia, loadAsset, asset }) => (
	<div className="panel panel-default">
		<div className="panel-heading">
			<h4>Controls</h4>
		</div>
		<div className="panel-body">
			<div className="btn-group btn-group-vertical btn-group-max-width" role="group" aria-label="Switch movies">
				{
					availableMedia.map((asset, ix) =>
						<MovieButton key={`asset_${ix}`} asset={asset} loadAsset={loadAsset} />)
				}
			</div>
		</div>
		<div className="panel-footer">
			{(asset && asset.name) && <small>Now playing: <span className="now-playing">{asset.name}</span></small>}
		</div>
	</div>
);

ControlsPanel.propTypes = {
	availableMedia: PropTypes.array,
	loadAsset: PropTypes.func,
	asset: PropTypes.object
};
