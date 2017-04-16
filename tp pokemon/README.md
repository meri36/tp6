# teaching-jxs-tp5 Angular JS
# TP6 Pokemon réalisé par Meriem Machnache & Lydia Moussa

Dans ce tp, nous avons eu l'occasion de découvrir :
les différents concepts d'angular JS.

   Ng-model, Ng-Repeat
   $scope,$resource , $service,$factory
   $http,$watch,$directive

 
# Recherche d'un pokémon via son numéro

Dans cette partie, nous avons récupérer le numéro, nous avons utilisé la directive ng-model d'AngularJS.
La directive ng-model permet de faire le binding,pour lier la balise input à la variable id du modèle, une fois la valeur de la balise input est changé le modèle se mette à jour automatiquement.

<input type="text" ng-model="id" /> : pour définir la directive 
{{id}} : pour afficher la valeur de l'id dans la vue.
 
# Recherche dans une liste
 
Nous avons déclaré un contrôleur PokControl dans le modèle pokedex.js.
Dans ce controlleur, nous avons déclaré une variable poks qui contient la liste de pokémons via le service $scope.

Le scope est le liant qui contient les variables qui assurent la liaison entre la vue et le controleur.
 
pokeApp.controller('PokController', function($scope) {</br>
$scope.nom="";</br>
$scope.poks = [ </br>
{id:1, nom: 'Pok1'}, </br>
{id:2, nom: 'Pok2'}, </br>
{id:3, nom: 'Pok3'},</br>
{id:4, nom: 'Pok4'},</br>
{id:5, nom: 'toto1'},</br>
{id:6, nom: 'toto2'},</br>
{id:7, nom: 'xxxx1'},</br>
{id:8, nom: 'xxxx2'}</br>
];</br>
});</br>

 </div> 
Pour récupérer la liste de pokémons, nous avons liés le contrôleur déclaré dans le modèle à la balisé div dans la vue.</br>

<div ng-controller="PokController">  : Associer le contrôleur <div> 

<select ng-model="selected">  : Lier la select au modèle.

<option ng-repeat="pok in poks">  : Parcourir la liste de pokémons
{{pok.nom}}  : Récupérer la liste de pokémons
</option>

<option ng-repeat="pok in poks   |filter:nom || filter:id"> : Pour faire des filtres par id ou nom.

# Accès à une API
 
Nous avons utilisé une API comme source d'information pour notre pokédex.
l'API offre la liste des pokémons ainsi que des informations détaillées pour chacun d'entre eux.
### En premier temps, nous avons utilisé le service $http pour récupérer la liste de pokémons , en précisant l'URL comme paramètre.
 $http.get("http://pokeapi.co/api/v2/pokedex/1/").then(function(response) {
 $scope.poks  = response.data.pokemon_entries;
 }); 

### Nous pouvons récupérer la liste de pokémons avec le service $resource en passant l'URL:
 $resource("http://pokeapi.co/api/v1/type/:id/")
 

### Création d'une factory 
 
Dans AngularJS, les services et les factories permettent d'obtenir un objet JavaScript à utiliser dans le code.
Leur but est le méme, seulement la syntaxe qui diffère. 

Une factory :
L'objet est instancié avec la valeur retournée par la fonction passée en paramètre. 
 
	 pokeApp.factory('factory', function($resource) {
	 return $resource('http://pokeapi.co/api/v2/pokemon/:id');
});

  
Un service:
Le service différe de la factory juste au  niveau de la syntaxe.
La fonction passée en paramètre est appelée comme un constructeur (new fonction()).

Après la création d'un service, nous pouvons l'appeler dans plusieurs contrôleurs et nous pouvons l'utiliser dans notre application.
 
Nous avons déclaré deux services : le servicePok  et le factory.
Le code pour récupérer un pokémon par son Id en utilisant le factory déjà défini:
	
		$scope.kur = factory.get({
		id :5
		});
		console.log($scope.kur);
   
		<h4>Recuperer les informations d'un pokemon en utilisant un service</h4>
			 
		Id: {{kur.id}}  </br>
		Nom: {{kur.name}}  
		
T### Communication
### Nous avons utilisé la fonction $watch.
$watch est une fonction attachée à $scope qui nous permet d'observer de mettre à jour l'affichage 
du pokemon lors du changement du pokémon recherché.

Le code suivant représente l'utilisation de la fonction $watch qui prend en paramètre la propriété  que nous souhaitons observer et une fonction function( newValue ).
Une fois le nom du pokemon recherché est modifié , l'autre label est mis à jour automatiquement.
 $scope.$watch('nom',function( newValue ) {
               //  console.log( newValue );
		 $scope.nom= newValue;
             }
         );
         
### Création d'une nouvelle directive
Le code suivant représente la création de la nouvelle directive appelé pokedex
avec un attribut classe.

.directive('pokedex', function() {
		  return {
			restrict: 'C',
		    templateUrl: 'pok.html'
		  };
		});

Nous avons déplacé le code HTML du pokédex dans un nouveau fichier en référançant la directive crée à ce fichier.

<!-- Appeler la directive appelé pokedex dans le fichoer index.html pour restaurer les 
fonctionnalités de notre application pokédex. -->
<span class="pokedex"></span>
