class themdb {
  dbOptions  = {
    api_key: 'fe408cecc08083ee7bed9c851afb8270',
    language: 'en'
  }
  api = 'https://api.themoviedb.org/3';

  constructor($http) {
    this.$http = $http;
  }

  discoverMovies(qo){
    return this.$http.get(`${this.api}/discover/movie`, {
      params: Object.assign(qo, this.dbOptions)
    })
    .then((res) => {
      return res.data.results;
    }, this.errorHandler);
  }

  findMoviesByName(q){
    return this.$http.get(`${this.api}/search/movie`, {
      params: Object.assign({query: q}, this.dbOptions)
    })
    .then((res) => {
      return res.data.results;
    }, this.errorHandler);
  }

  getGenres(){
    return this.$http.get(`${this.api}/genre/movie/list`, {
      params: this.dbOptions
    })
    .then((res) => {
      return res.data.genres;
    }, this.errorHandler);
  }

  getUpcomingMovies(){
    return this.$http.get(`${this.api}/movie/upcoming`, {
      params: this.dbOptions
    })
    .then((res) => {
      return res.data.results;
    }, this.errorHandler);
  }

  errorHandler(){
    console.log('shit happens');
    return false;
  }
}

export default themdb;
