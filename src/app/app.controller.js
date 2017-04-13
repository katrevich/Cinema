class appController {
  userName;
  userPassword;
  fetching = false;

  constructor($scope, $http) {
    'ngInject';
    this.$scope = $scope;
    this.$http = $http;
  }

  vote(i){
    this.movies.results[i].votes++;
  }

  login($event){
    $event.preventDefault();
    console.log(this.loginForm);
    if(this.loginForm.$valid){
      alert('valid!');
      this.$http.get('http://localhost:3001/user')
        .then((res)=>{
          const {data} = res;
          console.log(data);
        })
    } else {
      alert('not valid!');
    }
  }
}

export default appController;
