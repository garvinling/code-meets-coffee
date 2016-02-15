About = React.createClass({

	propTypes: {
	    classFromApp : React.PropTypes.string.isRequired,
	    visible      : React.PropTypes.bool.isRequired

	},

	getInitialState() {
	    return {
	        visible : false ,
	        animateClass : '' 
	    };
	},


	render() {

		return(
			<div className={this.props.classFromApp}>
				<div className="about-text-container">
					<h3>About</h3>
					<p className="about-description">
						WYGT gives you a (seemingly) endless stream of random open source projects pulled from the Github API.
						Either use this as a way to quickly browse through projects or login through Github and the app will automatically 
						send your stars to your Github profile.  <a href="#">read more...</a>
					</p>

					<p className="about-description">
						This project was borne from a desire to quickly discover interesting open source projects.
						This is a super early &amp; rough prototype so future enhancements and improvements 
						are definitely in the plans.
					</p>

					<p className="about-description">
						Find me  <a target="_blank"  href="https://twitter.com/GarvinLing">@garvinling</a> on twitter <br/>
						Find the <a target="_blank" href="https://github.com/garvinling/code-meets-coffee">code</a> on github
					</p>

		
				</div>
			</div> 

		 


		);


	}



});