RepoCard = React.createClass({

	propTypes : {

		repo : React.PropTypes.object.isRequired,
		handleSwipeLeft : React.PropTypes.func.isRequired,
		handleSwipeRight : React.PropTypes.func.isRequired

	},


	handleSwipeLeft() { 
		
		this.props.handleSwipeLeft();
	},

	handleSwipeRight() {



		this.props.handleSwipeRight();
	},

	render(){

		var styles = { 

			backgroundImage: "url(" + this.props.repo.image + ")"


		};

		return(

				<div className="card-container">
					
			
					<div className="repo-bg-image" style={styles}></div>			
					<div className="title-container"><h1 className="repo-title">{this.props.repo.name}</h1></div>
					<div className="row description-stats">
						<div className="col-md-6">
							<div className="description-container">{this.props.repo.description}</div>
						</div>
						<div className="col-md-6">
							<RepoCardStats repo={this.props.repo}/>
						</div>
					</div>
				
					<div className="card-button-group row">
						<h4>Would you commit this?</h4>
						<div className="col-xs-6 nope">
							<button className="btn btn-danger nope-button" onClick={this.handleSwipeLeft}>NAW</button>
						</div>
						<div className="col-xs-6 yep">
							<button className="btn btn-success yep-button" onClick={this.handleSwipeRight}>YA</button>
						</div>
					</div>
				</div>

		);
	}

});
					

