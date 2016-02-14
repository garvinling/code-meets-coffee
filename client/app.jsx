App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){

		return { 

			currentIndex : 0 ,
			aboutVisible : true,
			animationSelected : 'hideAbout',
			lastCommand  : '' 

		}

	},

	getMeteorData(){

		return {
			repoCards  : Repos.find().fetch()
		}	
	},


	renderCurrentRepo(){


			var reposGroup = [
				this.data.repoCards[this.state.currentIndex],
				this.data.repoCards[this.state.currentIndex+1],
				this.data.repoCards[this.state.currentIndex+2]
			];

			if(reposGroup[0] !== undefined) {

				return ( 
					<div>
						<RepoCard key={reposGroup[0]._id} repo={reposGroup[0]}   cardPosition={0} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>;
						<RepoCard key={reposGroup[1]._id} repo={reposGroup[1]}   cardPosition={1} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>
						<RepoCard key={reposGroup[2]._id} repo={reposGroup[2]}   cardPosition={2} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>
					</div>
				);
			}
			return (
				<div className="loading-container">
					<img src="/loading-1.gif"/>
				</div>
			);
		

	},

	renderNextRepo() {

		var repoFromAPI  = this.data.repoCards[this.state.currentIndex + 1];
		if(repoFromAPI !== undefined) {

			return (

				<RepoCard key={repoFromAPI._id} cardPosition={2} repo={repoFromAPI} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>
			);
		}
		
	},


	getMoreRepos() {

		Meteor.call("getReposFromAPI","javascript","stars","desc",false,function(err,res){
				
				console.log('Done retrieving repos.');

		});   
	},

	shouldComponentUpdate(nextProps, nextState) {

		/**
			The +1 is because setState does not immediately update the state.
			While the state is in transition, use +1 to lookahead since we are exepcting it to be updated
			This is most likely not the best way to go about this.  Should refactor later.
		**/

		return (this.state.currentIndex +1) % 3 === 0;

	},

	handleSwipeLeft() {

		this.setState({currentIndex : this.state.currentIndex + 1});
		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		}
	},


	handleSwipeRight() {
		
		var length = this.data.repoCards.length; 

		this.setState({currentIndex : this.state.currentIndex + 1});

		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		}
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
		return (
			<div className="main-container">
			<HeaderBar toggleAbout={this.toggleAbout} />
			<About visible={this.state.aboutVisible} classFromApp={classNames('about-container','animated',this.state.animationSelected)}/> 
						{this.renderCurrentRepo()}
					
			</div>

		);

	}




});