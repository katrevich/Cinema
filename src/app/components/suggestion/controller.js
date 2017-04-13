class Suggestion {
  name = '';
  movies = [];
  fetching = false;

  tab = 1;
  years = []
  year = '';
  genres = [];

  year;
  genre;

  constructor($scope, themdb, $http) {
    'ngInject';

    this.$scope = $scope;
    this.themdb = themdb;
    this.$http = $http;

    for(let i = 1960; i <= 2016; i++){
      this.years.push(i)
    }

    this.getGenres();
  }

  getGenres(){
    this.themdb.getGenres()
      .then((genres) => {
        this.genres = genres;
      })
  }

  search(){
    if(this.name.length > 3){
      this.themdb.findMoviesByName(this.name)
        .then((data) => {
          // console.log(data);
          this.movies = data;
        })
    }
  }

  discover(){
    this.themdb.discoverMovies({
      primary_release_year: this.year,
      with_genres: this.genre
    })
      .then((data) => {
        this.movies = data;
      })
  }

  addMovie(id){
    // console.log(id);
    this.$http.post('http://localhost:3001/api/movie', {movie: this.movies[id]})
      .then(()=>{
        console.log('posted');
      })
  }

  getNumber(num){
    return new Array(num);
  }
}

export default Suggestion;
