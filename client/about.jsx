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
						Either use this app as a way to quickly browser through projects or login through Github and star 
						these for later reference.  <a href="#">read more...</a>
					</p>

					<p className="about-description">
						This project was borne from a desire to quickly discover interesting open source projects to either contribute to 
						or use in other projects. This is a super early/rough prototype to future enhancements and improvements are definitely in the plans.
					</p>

					<p className="about-description">
						Find me <a href="https://twitter.com/GarvinLing">@garvinling</a> on twitter
					</p>
					<p className="testimonial">
						"You'll find things here that you didn't even know you wanted to exist.  
						<span className="highlight"> But they do."</span>
						<span className="author"> - CEO, Lorem Ipsum</span>
					</p>
		
				</div>
			</div> 

		 


		);


	}



});