# teaching-jxs-tp5 Angular JS
# TP6 Pokemon r�alis� par Meriem Machnache & Lydia Moussa

Dans ce tp, nous avons eu l'occasion de d�couvrir :
les diff�rents concepts d'angular JS.

   Ng-model, Ng-Repeat
   $scope,$resource , $service,$factory
   $http,$watch,$directive

 
# Recherche d'un pok�mon via son num�ro

Dans cette partie, nous avons r�cup�rer le num�ro, nous avons utilis� la directive ng-model d'AngularJS.
La directive ng-model permet de faire le binding,pour lier la balise input � la variable id du mod�le, une fois la valeur de la balise input est chang� le mod�le se mette � jour automatiquement.

<input type="text" ng-model="id" /> : pour d�finir la directive 
{{id}} : pour afficher la valeur de l'id dans la vue.
 
# Recherche dans une liste
 
Nous avons d�clar� un contr�leur PokControl dans le mod�le pokedex.js.
Dans ce controlleur, nous avons d�clar� une variable poks qui contient la liste de pok�mons via le service $scope.

Le scope est le liant qui contient les variables qui assurent la liaison entre la vue et le controleur.

pokeApp.controller('PokController', function($scope) {
$scope.nom="";
$scope.poks = [
{id:1, nom: 'Pok1'},
{id:2, nom: 'Pok2'},
{id:3, nom: 'Pok3'},
{id:4, nom: 'Pok4'},
{id:5, nom: 'toto1'},
{id:6, nom: 'toto2'},
{id:7, nom: 'xxxx1'},
{id:8, nom: 'xxxx2'}
];
});

  
Pour r�cup�rer la liste de pok�mons, nous avons li�s le contr�leur d�clar� dans le mod�le � la balis� div dans la vue.

<div ng-controller="PokController">  : Associer le contr�leur <div>

<select ng-model="selected">  : Lier la select au mod�le.

<option ng-repeat="pok in poks">  : Parcourir la liste de pok�mons
{{pok.nom}}  : R�cup�rer la liste de pok�mons
</option>

<option ng-repeat="pok in poks   |filter:nom || filter:id"> : Pour faire des filtres par id ou nom.

# Acc�s � une API
 
Nous avons utilis� une API comme source d'information pour notre pok�dex.
l'API offre la liste des pok�mons ainsi que des informations d�taill�es pour chacun d'entre eux.
### En premier temps, nous avons utilis� le service $http pour r�cup�rer la liste de pok�mons , en pr�cisant l'URL comme param�tre.
 $http.get("http://pokeapi.co/api/v2/pokedex/1/").then(function(response) {
 $scope.poks  = response.data.pokemon_entries;
 }); 

### Nous pouvons r�cup�rer la liste de pok�mons avec le service $resource en passant l'URL:
 $resource("http://pokeapi.co/api/v1/type/:id/")
 

### Cr�ation d'une factory 
 
Dans AngularJS, les services et les factories permettent d'obtenir un objet JavaScript � utiliser dans le code.
Leur but est le m�me, seulement la syntaxe qui diff�re. 

Une factory :
L'objet est instanci� avec la valeur retourn�e par la fonction pass�e en param�tre. 
 
	 pokeApp.factory('factory', function($resource) {
	 return $resource('http://pokeapi.co/api/v2/pokemon/:id');
});

  
Un service:
Le service diff�re de la factory juste au  niveau de la syntaxe.
La fonction pass�e en param�tre est appel�e comme un constructeur (new fonction()).

Apr�s la cr�ation d'un service, nous pouvons l'appeler dans plusieurs contr�leurs et nous pouvons l'utiliser dans notre application.
 
Nous avons d�clar� deux services : le servicePok  et le factory.
Le code pour r�cup�rer un pok�mon par son Id en utilisant le factory d�j� d�fini:
	
		$scope.kur = factory.get({
		id :5
		});
		console.log($scope.kur);
   
		<h4>Recuperer les informations d'un pokemon en utilisant un service</h4>
			 
		Id: {{kur.id}}  </br>
		Nom: {{kur.name}}  
		
T### Communication
### Nous avons utilis� la fonction $watch.
$watch est une fonction attach�e � $scope qui nous permet d'observer de mettre � jour l'affichage 
du pokemon lors du changement du pok�mon recherch�.

Le code suivant repr�sente l'utilisation de la fonction $watch qui prend en param�tre la propri�t�  que nous souhaitons observer et une fonction function( newValue ).
Une fois le nom du pokemon recherch� est modifi� , l'autre label est mis � jour automatiquement.
 $scope.$watch('nom',function( newValue ) {
               //  console.log( newValue );
		 $scope.nom= newValue;
             }
         );
         
### Cr�ation d'une nouvelle directive
Le code suivant repr�sente la cr�ation de la nouvelle directive appel� pokedex
avec un attribut classe.

.directive('pokedex', function() {
		  return {
			restrict: 'C',
		    templateUrl: 'pok.html'
		  };
		});

Nous avons d�plac� le code HTML du pok�dex dans un nouveau fichier en r�f�ran�ant la directive cr�e � ce fichier.

<!-- Appeler la directive appel� pokedex dans le fichoer index.html pour restaurer les 
fonctionnalit�s de notre application pok�dex. -->
<span class="pokedex"></span>
