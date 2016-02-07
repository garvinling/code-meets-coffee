Readme = React.createClass({

	renderReadMe() {

		Meteor.call("getReadMe","2",function(err,res){
				return res;
		});

	},

	render() {
		console.log(this.props)

		return(
			<div>
			{this.props.readme}
			</div>
		);


	}


});