

	const root = document.querySelector(":root");

	var ligne=4;
	var colonne=3;
	var compteur_cartes=0;
	const gridContainer = document.getElementById('myGrid');
	var arraytemps =[0,0,0];
	var dictidtonum={};
	var firstclickid="";
	var nombre_click=5;
	var moninterval;
	var tempsdepart=0;

	clearInterval(moninterval);


	grille();
	


function demarre(){
	let level=document.querySelector('input[name="radio"]:checked').value;

	switch(level) {
	  case "3":
		colonne=8;
		ligne=5;
		break;
	  case "2":
		colonne=6;
		ligne=4;
		break;
	  default:
		colonne=4;
		ligne=4;
	} 

	document.getElementById("fin3").innerHTML="";
	document.getElementById("fin2").innerHTML=":";
	document.getElementById("fin1").innerHTML="";
	document.getElementById("fin4").innerHTML="";
	firstclickid="";
	nombre_click=0;
	compteur_cartes=0;
	clearInterval(moninterval);
	// on enregistre une base de temps
	tempsdepart=performance.now();
	moninterval=setInterval("afficheheure()",1000);
	grille();
}


function afficheheure(){

	let x=performance.now()-tempsdepart;



	let millis =Math.floor(x%1000);
	let secondes =Math.floor((x%60000)/1000);
	let minutes =Math.floor((x%3600000)/60000);
	arraytemps=[minutes,secondes,millis];

	document.getElementById("fin1").innerHTML=minutes;
	document.getElementById("fin3").innerHTML=secondes;
}

function clicksurcarte(event){
	nombre_click=nombre_click+1;

	if (nombre_click <= 2){

		// on récupère l'identifiant de la carte	
		let bonneid = event.target.id;
		// on récupère le numéro du graphique
		let num=dictidtonum[bonneid][0];
		//document.getElementById("tirages").innerHTML= num;
		// on prépare l'affichage de la carte
		let canvas = document.getElementById(bonneid);
		let ctx = canvas.getContext('2d');
		// on désactive la possibilité de click sur la nouvelle carte
		canvas.removeEventListener('click', clicksurcarte);
		// on affiche la carte
		dessineface(ctx,num);

	
		if (firstclickid==""){

			// on mémorise la carte retournée par l'identifiant du canvas
			firstclickid=bonneid;

		}
		else{
			// il y a déjà une carte retournée
			// on récupère le numéro de graphique de la première carte
			let num2=dictidtonum[firstclickid][0];

			// si les deux cartes sont identiques
			if(num==num2){

				// on réinitialise  firstclickid à vide
				firstclickid="";
				nombre_click=0;
				// on ne réactive pas les cartes, elles restent visibles
				// en principe elles sont déjà désactivées
				compteur_cartes=compteur_cartes+2;

				// on teste la fin du jeu
				testfin(compteur_cartes);
			}
			// sinon
			else{		

				setTimeout(retournecartes,1000,firstclickid,bonneid);
				canvas.addEventListener('click', clicksurcarte);
				canvas = document.getElementById(firstclickid);
				canvas.addEventListener('click', clicksurcarte);
				// on réinitialise  firstclickid à vide et le nombre de clicks
				firstclickid="";
			}
		}
	}
}

function testfin(n){
	if(n==colonne*ligne){

		document.getElementById("fin3").innerHTML="";
		document.getElementById("fin2").innerHTML="";
		document.getElementById("fin1").innerHTML=arraytemps[0]+":"+arraytemps[1]+":"+arraytemps[2];
		document.getElementById("fin4").innerHTML="Game over";
		clearInterval(moninterval);
	}
}
function retournecartes(canvas1,canvas2){
	let canvas = document.getElementById(canvas1);
	let ctx = canvas.getContext('2d');
	dessinedos(ctx);
	canvas = document.getElementById(canvas2);
	ctx = canvas.getContext('2d');
	dessinedos(ctx);
	nombre_click=0;
}



