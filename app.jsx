App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return null;

	},

	getMeteorData(){

		return {

			test : "lol"
		}	


	},

	renderCurrentRepo(){

		return <RepoCard />;
	},


	render(){
		return (
			<div className="main-container">
				{this.renderCurrentRepo()}
			</div>

		);

	}




});