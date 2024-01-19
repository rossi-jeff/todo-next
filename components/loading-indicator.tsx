export default function LoadingIndicator() {
	return (
		<div id="loading-indicator" className="modal-overlay open">
			<div id="loading-modal" className="dialog open w-96">
				<div className="dialog-header">
					<h3>Loading ...</h3>
				</div>
				<div className="dialog-content">
					<div className="field text-sm">
						Random users loading for authorization
					</div>
				</div>
			</div>
		</div>
	)
}
