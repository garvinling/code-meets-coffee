App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return { 

			currentIndex : 0 ,
			aboutVisible : false,
			animationSelected : 'hideAbout'

		}

	},

	getMeteorData(){

		return {
			repoCards  : Repos.find().fetch()
		}	
	},


	renderCurrentRepo(){

		var repoFromAPI  = this.data.repoCards[this.state.currentIndex];

		if(repoFromAPI !== undefined) {

			return <RepoCard key={repoFromAPI._id} repo={repoFromAPI} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>;
		}


		return (

				<div className="loading-container">
					<img src="/loading-1.gif"/>
				</div>


			);
	},


	getMoreRepos() {

		Meteor.call("getReposFromAPI","javascript","stars","desc",false,function(err,res){
				
				console.log('Done retrieving repos.');

		});   
	},

	handleSwipeLeft() {

		var length = this.data.repoCards.length;
		this.state.currentIndex++;

		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		
		}

		this.forceUpdate();

	},


	handleSwipeRight() {
		
		var length = this.data.repoCards.length;
		this.state.currentIndex++;

		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();

		}
		this.forceUpdate();        
	},

	toggleAbout() {

		this.setState({aboutVisible : !this.state.aboutVisible});


		if(this.state.aboutVisible === false) {

			this.setState({animationSelected : 'fadeInLeft'})

		} else {
			this.setState({animationSelected : 'fadeOutLeft'})

		}
	},

	render(){
		console.log(this.state.animationSelected);
		return (
			<div className="main-container">
			<HeaderBar toggleAbout={this.toggleAbout} />
			<About visible={this.state.aboutVisible} classFromApp={classNames('about-container','animated',this.state.animationSelected)}/> 

	

				{this.renderCurrentRepo()}
			</div>

		);

	}




});