/*
* filtre additif si une competence match avec l'offre de stage
* alors l'offre et referencee
* cas special : quand aucune competence selectionnee
* alors affiche toute les offres de stages
 */
app.filter('customCompetenceFilter', function() {
    return function(item, competenceSelection) {
        var res = [];
        if(typeof competenceSelection[0] == 'undefined' ) return item;
        item.forEach(function(element) {
            // si element a des competences dans ce cas verifier s'il contient
            // au moins l'une des competences selectionnees
            if(typeof element.competences[0] !== 'undefined') {
                var x = true;
                for(var i = 0; i < element.competences.length; i++) {
                    for(var j = 0; j < competenceSelection.length; j++) {
                        // pour chaque competence verifier si id == id des competences selectionnees
                        if (element.competences[i].id == competenceSelection[j].id) {
                            x = false;
                            // range l'element dans le resultat final
                            res.push(element);
                            //i++; // on boucle sur le prochain element
                            //j = 0; // recherche sur toute les competences pour le prochain elements
                        }
                    }
                }
            }
        });
        return res;
    };
});
