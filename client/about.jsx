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
				<h3>About</h3>
				<p className="about-description">
					WYGT gives you a (seemingly) endless stream of random open source projects pulled from Github.
					Either use this app as a way to quickly browser through projects or login through Github and star 
					these for later reference.  <a href="#">read more...</a>
				</p>

				<p className="testimonial">
					"You'll find things here that you didn't even know you wanted to exist.  
					<span className="highlight"> But they do."</span>
					<span className="author"> - CEO, Lorem Ipsum</span>
				</p>
				<p className="testimonial">
					"WYGT pairs the convenience of casual sex apps like 🔥 and smushes it together with 
					your desire to find interesting and useful <span className="highlight">open source projects."</span>
					<span className="author"> - Some tech blog , probably</span>
				</p>
				<p className="testimonial">
					"This isn't about pull request, branching, and merges.  This is that <span className="highlight">straight to master type shit. "</span>
					<span className="author"> - Joe</span>
				</p>
			</div> 

		 


		);


	}



});