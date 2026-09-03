let donnees = [];

// Recuperer les elements

const formulaire = document.querySelector('.formulaire');
const champ_libelle = document.getElementById('libelle');
const champ_montant = document.getElementById('montant');
const type_choisie = document.getElementById('type');
const categorie_selectionner = document.getElementById('categorie');
const boutton_envoi = document.getElementById('btn');

const conteneur = document.querySelector('.contenu');
const partie_solde = document.querySelector('.resultat');


// Poser les ecoutes

formulaire.addEventListener('submit', (event) => {
    event.preventDefault();

    const lib = champ_libelle.value;
    const mtn = Number(champ_montant.value);
    const typ = type_choisie.value;
    const cat = categorie_selectionner.value;

    if(mtn < 0) {
        alert("Montant invalide");
    } else {
        donnees.push({libelle: lib, montant: mtn, type: typ, categorie: cat});
        genererCartes(donnees);
        calculSolde(donnees);
        formulaire.reset();
    }

    
    
});   

// Declaration des fonctions 

function genererCartes (liste){
    conteneur.innerHTML ="";
    liste.forEach(objet => {
        const item = document.createElement('div');
        item.className ='carte';

        const btn = document.createElement('button');
        const index = liste.indexOf(objet);
        btn.className = 'supp';
        btn.textContent = " 🗑️ Supprimer";
        btn.addEventListener('click', (event) => {
            liste.splice(index, 1);
            genererCartes(donnees);
            calculSolde(donnees);
        })

        item.innerHTML = `
        <h3>${objet.libelle}</h3>
        <p>${objet.categorie}</p>
        <p><em>${objet.type}</em> : ${objet.montant} F</p>
        `;
        item.appendChild(btn);
        conteneur.appendChild(item);

    });
};

function calculSolde(liste){
    partie_solde.innerHTML = "";
    let totalEntrer = 0;
    let totalSortie = 0;
    
    liste.forEach(objet => {
        if (objet.type === "Revenu" && objet.montant >= 0) {
            totalEntrer = totalEntrer + Number(objet.montant);
        } else if(objet.type === "Depense" && objet.montant>=0) {
            totalSortie = totalSortie + Number(objet.montant);
        } else {
            alert("Le montant saisie est invalide");
        }
    });
        let solde = totalEntrer - totalSortie;
        let deficit = solde * -1;
        if(solde < 0) {
            partie_solde.innerHTML = `
            <h3>Solde actuelle : ${solde} F</h3>
            <p>⚠️Vous avez un déficit de ${deficit} F</p>
            `;
        } else {
            partie_solde.innerHTML = `
            <h3>Solde actuelle : ${solde} F</h3>
            `;
        };  
};



