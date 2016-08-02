App = React.createClass({

	mixins : [ReactMeteorData],

	getInitialState(){


		this.renderCurrentRepo();


		return { 

			currentIndex : 0 ,
			lastCommand  : '',
			reposGroup : [{_id:currentIndex},{_id:currentIndex+1},{_id:currentIndex+2}],
			repos : [],
			aboutVisible : false,
			animationSelected : 'hideAbout'

		}

	},


	getMeteorData(){

		return {
			currentUser : Meteor.user()
		}	
	},


	renderCurrentRepo(){
		
		var that        = this;
		var _reposGroup = [];


			Meteor.call('getReposFromAPI','javascript','stars','desc',false,function(err,res){
					


				    _reposGroup = [

						res[this.state.currentIndex],
						res[this.state.currentIndex+1],
						res[this.state.currentIndex+2]

					];

					this.setState({reposGroup:_reposGroup, repos : res});

			}.bind(this));   




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

		Meteor.call('getReposFromAPI','javascript','stars','desc',false,function(err,res){
				
				console.log('Done retrieving repos.');

		});   
	},

	// shouldComponentUpdate(nextProps, nextState) {

	// 	*
	// 		The +1 is because setState does not immediately update the state.
	// 		While the state is in transition, use +1 to lookahead since we are exepcting it to be updated
	// 		This is most likely not the best way to go about this.  Should refactor later.
	// 	*


	// 	return true;

	// 	// if(this.state.repos.length < 1) {
	// 	// 	return true;
	// 	// }

	// 	// return (this.state.currentIndex +1) % 3 === 0; //move this to swipe handler

	// },

	handleSwipeLeft() {


		var length = this.state.repos.length; 

		if((this.state.currentIndex+1) % 3 === 0){
			

			var newIndex      = this.state.currentIndex + 1;
			var newReposGroup = [this.state.repos[newIndex],this.state.repos[newIndex+1],this.state.repos[newIndex+2]];

			this.setState({

				currentIndex : newIndex,
				reposGroup   : newReposGroup

			});


		} else {


			this.setState({currentIndex : this.state.currentIndex + 1});

		}


		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		}
	},


	handleSwipeRight() {
		
		var length = this.state.repos.length; 
		
		if((this.state.currentIndex+1) % 3 === 0){
			

			var newIndex      = this.state.currentIndex + 1;
			var newReposGroup = [this.state.repos[newIndex],this.state.repos[newIndex+1],this.state.repos[newIndex+2]];



			this.setState({

				currentIndex : newIndex,
				reposGroup   : newReposGroup

			});


		} else {


			this.setState({currentIndex : this.state.currentIndex + 1});

		}



		if(length - this.state.currentIndex === 15) {
			
			this.getMoreRepos();
		}
	},



	toggleAboutSection() {
		
		this.setState({aboutVisible : !this.state.aboutVisible});

		if(this.state.aboutVisible === false) {

			this.setState({animationSelected : 'slideInUp'})

		} else {
			this.setState({animationSelected : 'slideOutDown'})

		}
	},


	render(){ 

		return (
			<div className="main-container">
				<HeaderBar user={this.data.currentUser} toggleAbout={this.toggleAboutSection} aboutVisible={this.state.aboutVisible} animationSelected={this.state.animationSelected} />
			
						<RepoCard key={this.state.reposGroup[0]._id} repo={this.state.reposGroup[0]}   cardPosition={0} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>
						<RepoCard key={this.state.reposGroup[1]._id} repo={this.state.reposGroup[1]}   cardPosition={1} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/>
						<RepoCard key={this.state.reposGroup[2]._id} repo={this.state.reposGroup[2]}   cardPosition={2} handleSwipeRight={this.handleSwipeRight} handleSwipeLeft={this.handleSwipeLeft}/> 
				

			</div>

		);

	}

});

var currentIndex = 0;