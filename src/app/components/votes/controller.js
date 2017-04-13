class votes {
  genres = [];
  movies = [];

  dbOptions  = {
    api_key: 'fe408cecc08083ee7bed9c851afb8270',
    language: 'en'
  }
  fetching = false;

  constructor($scope, themdb, $http) {
    'ngInject';
    this.$scope = $scope;
    this.themdb = themdb;
    this.$http = $http;

    this.fetching = true;
    this.getMovies();
  }

  getMovies(){
    this.$http.get('http://localhost:3001/api/movies')
      .then((data) => {
        console.log(data);
        this.movies = data.data;
        this.fetching = false;
      })
  }

  vote(id){
    this.$http.put('http://localhost:3001/api/movie', {title: this.movies[id].title})
      .then(()=>{
        this.getMovies();
      })
  }

  deleteMovie(id){
    this.$http.put('http://localhost:3001/api/movies', {title: this.movies[id].title})
      .then(()=>{
        this.getMovies();
      })
  }
}

export default votes;
