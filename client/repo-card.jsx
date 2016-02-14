RepoCard = React.createClass({



	getInitialState() {
		var initialCardClass = classNames('card-container');

		if(this.props.cardPosition === 1) {
			
			initialCardClass = classNames('card-container' , 'card2');
		
		} else if(this.props.cardPosition === 2) {

			initialCardClass = classNames('card-container', 'card3');
		}

	    return {
	        containerClass : initialCardClass,
	        starClass      : classNames('like-icon','hide')
	    };
	},


	propTypes : {

		repo : React.PropTypes.object.isRequired,
		handleSwipeLeft : React.PropTypes.func.isRequired,
		handleSwipeRight : React.PropTypes.func.isRequired,
		cardPosition : React.PropTypes.number.isRequired

	},


	handleSwipeLeft() { 




		this.setState({ containerClass : classNames('card-container','animated','rotateOutUpLeft')});
        var that = this;
        setTimeout(function() {
			that.props.handleSwipeLeft();
        }, 900);
    


	},

	handleSwipeRight() {

		if(Meteor.user()) {

			var userName = this.props.repo.username;
			var repoName = this.props.repo.name;
			Meteor.call("starRepo",userName,repoName);

		}
		

		this.setState({ starClass : classNames('like-icon','animated','zoomIn')});

        var that = this;

		setTimeout(function() {
			that.setState({ containerClass : classNames('card-container','animated','rotateOutUpRight')});
	        setTimeout(function() {
				that.props.handleSwipeRight();
	        }, 900);
        }, 500);

       
       

	},

	render(){

		var styles = { 
			backgroundImage: "url(" + this.props.repo.image + ")"
		};



		return(
				<div className={this.state.containerClass}>


					<div className={this.state.starClass}>
					  <span className="glyphicon glyphicon-star" aria-hidden="true"></span>

					</div>

					<div className="repo-bg-image" style={styles}></div>			
					<div className="title-container"><h1 className="repo-title">{this.props.repo.name}</h1></div>
					<RepoCardStats repo={this.props.repo}/>

					<div className="description-container">{this.props.repo.description}</div>

					<div className="card-button-group row">
						<div className="col-xs-6 nope">
							<button className="btn btn-danger nope-button hvr-grow" onClick={this.handleSwipeLeft}>
								<span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
							</button>
						</div>
						<div className="col-xs-6 yep">
							<button className="btn btn-success yep-button hvr-grow" onClick={this.handleSwipeRight}>
								<span className="glyphicon glyphicon-star" aria-hidden="true"></span>
							</button>
						</div>
					</div>
				</div>

		);
	}

});
					

