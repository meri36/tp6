var pokeApp = angular.module('pokedex', ['ngResource']);


pokeApp.controller('PokControl',  function($scope,$log) {
	 $scope.nom="";
//	  $scope.poks = [
//		         {id:1, nom: 'Pok1'},
//		         {id:2, nom: 'Pok2'},
//		         {id:3, nom: 'Pok3'},
//		         {id:4, nom: 'Pok4'},
//		         {id:5, nom: 'toto1'},
//		         {id:6, nom: 'toto2'},
//		         {id:7, nom: 'xxxx1'},
//		         {id:8, nom: 'xxxx2'}
//        		 ];  
 });



/* 11 Créer un service qui utilise $resource pour accéder aux informations d'un pokémon */
  pokeApp.factory('factory', function($resource) {
	return $resource('http://pokeapi.co/api/v2/pokemon/:id');
});

   
  
  pokeApp.service('servicePok', function() {
	  this.setId = function(id) {
			this.id = id
		};
		this.getId = function() {
			return this.id;
		};
		this.setName = function(name) {
			this.name = name
		};
		this.getName = function() {
			return this.name;
		};
});


pokeApp.controller('PokController',  function($scope,$log, $http,factory) {
	 $scope.nom="";
//	  $scope.poks = [
//		         {id:1, nom: 'Pok1'},
//		         {id:2, nom: 'Pok2'},
//		         {id:3, nom: 'Pok3'},
//		         {id:4, nom: 'Pok4'},
//		         {id:5, nom: 'toto1'},
//		         {id:6, nom: 'toto2'},
//		         {id:7, nom: 'xxxx1'},
//		         {id:8, nom: 'xxxx2'}
//        		 ];  
	
	 /* afficher hello console */
	$log.info("Hello");
	
	/* tester le service log */
	$scope.myClick = function(){
		    $log.log($scope.selected)
		    }; 
		   
	 
	 
	/*Récuperer la liste de poks via le service http*/
  $http.get("http://pokeapi.co/api/v2/pokedex/1/").then(function(response) {
  	$scope.poks  = response.data.pokemon_entries;
		 	}); 
   
  	/*Appeler factory pour rechercher un pokemen par son id */
	$scope.kur = factory.get({
		id :5
	});
	console.log($scope.kur);
	
	 
	/* Utiliser le service $watch pour mettre à jour 
	   l'affichage du pokédex lors du changement du pokémon recherché */ 
	 $scope.$watch('nom',function( newValue ) {
               //  console.log( newValue );
		 $scope.nom= newValue;
             }
         );
	  
 })
 
	 /* Creer une nouvelle directive avec l'attribut class*/
	.directive('pokedex', function() {
		  return {
			restrict: 'C',
		    templateUrl: 'pok.html'
		  };
		});






