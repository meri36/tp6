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
</br>
 </div> </br>
Pour récupérer la liste de pokémons, nous avons liés le contrôleur déclaré dans le modèle à la balisé div dans la vue.</br>

<div ng-controller="PokController">  : Associer le contrôleur <div> 
</br>
<select ng-model="selected">  : Lier la select au modèle. </br>
</br>
<option ng-repeat="pok in poks">  : Parcourir la liste de pokémons </br>
{{pok.nom}}  : Récupérer la liste de pokémons </br>
</option> </br>
</br>
<option ng-repeat="pok in poks   |filter:nom || filter:id"> : Pour faire des filtres par id ou nom. </br>
</br>
# Accès à une API </br>
 </br>
Nous avons utilisé une API comme source d'information pour notre pokédex.</br>
</br>
l'API offre la liste des pokémons ainsi que des informations détaillées pour chacun d'entre eux.</br>
</br>
### En premier temps, nous avons utilisé le service $http pour récupérer la liste de pokémons , en précisant l'URL comme paramètre.</br>
</br>
 $http.get("http://pokeapi.co/api/v2/pokedex/1/").then(function(response) { </br>
 </br>
 $scope.poks  = response.data.pokemon_entries;</br>
 </br>
 }); </br>
 </br>
</br>
### Nous pouvons récupérer la liste de pokémons avec le service $resource en passant l'URL:</br>
</br>
 $resource("http://pokeapi.co/api/v1/type/:id/")</br>
 </br>
 </br>
</br>
### Création d'une factory </br>
 </br>
Dans AngularJS, les services et les factories permettent d'obtenir un objet JavaScript à utiliser dans le code.</br>
</br>
Leur but est le méme, seulement la syntaxe qui diffère. </br>
</br>
Une factory :</br>
</br>
L'objet est instancié avec la valeur retournée par la fonction passée en paramètre.</br> 
 </br>
</br>	 pokeApp.factory('factory', function($resource) {</br>
</br>
	 return $resource('http://pokeapi.co/api/v2/pokemon/:id'); 
});</br>
</br>
</br> 
Un service: </br>
</br>
Le service différe de la factory juste au  niveau de la syntaxe. </br>
</br>
La fonction passée en paramètre est appelée comme un constructeur (new fonction()). </br>
</br>
Après la création d'un service, nous pouvons l'appeler dans plusieurs contrôleurs et nous pouvons l'utiliser dans notre application.
 </br>
Nous avons déclaré deux services : le servicePok  et le factory. </br>
Le code pour récupérer un pokémon par son Id en utilisant le factory déjà défini: </br>
</br>	
		$scope.kur = factory.get({   </br>
		id :5   </br>
		});  </br>
		console.log($scope.kur); </br>
   </br>
		<h4>Recuperer les informations d'un pokemon en utilisant un service</h4> </br>
		</br>	 
		Id: {{kur.id}}  </br>
		Nom: {{kur.name}}  </br>
</br>		
T### Communication </br>
</br>
### Nous avons utilisé la fonction $watch. </br>
</br>
$watch est une fonction attachée à $scope qui nous permet d'observer de mettre à jour l'affichage  </br>
</br>
du pokemon lors du changement du pokémon recherché. </br>
</br>
Le code suivant représente l'utilisation de la fonction $watch qui prend en paramètre la propriété  que nous souhaitons observer et une </br>
fonction function( newValue ). </br>
</br>
Une fois le nom du pokemon recherché est modifié , l'autre label est mis à jour automatiquement. </br>
</br>
 $scope.$watch('nom',function( newValue ) { </br>
 
               //  console.log( newValue );  </br>
		 $scope.nom= newValue; </br>
             } </br>
         ); </br>
         
### Création d'une nouvelle directive </br>
Le code suivant représente la création de la nouvelle directive appelé pokedex </br>
avec un attribut classe. </br>
</br>
.directive('pokedex', function() { </br>
		  return { </br>
			restrict: 'C', </br>
		    templateUrl: 'pok.html' </br>
		  }; </br>
		}); </br>
</br>
Nous avons déplacé le code HTML du pokédex dans un nouveau fichier en référançant la directive crée à ce fichier. </br>
</br>
<!-- Appeler la directive appelé pokedex dans le fichoer index.html pour restaurer les  
fonctionnalités de notre application pokédex. -->
<span class="pokedex"></span> </br>
