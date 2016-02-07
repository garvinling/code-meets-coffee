RepoCardButtons = React.createClass({

	// propTypes : {

	// 	handleSwipeRight : React.PropTypes.function.isRequired
	// },


	render() {

		console.log(this.props)
		return (

			<div className="card-button-group row">
				<div className="col-xs-6 nope">
					<button className="btn btn-danger yep-button">
						<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
					</button>
				</div>
				<div className="col-xs-6 yep">
					<button className="btn btn-success yep-button">
						<span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
					</button>
				</div>
			</div>

		);


	}
});

