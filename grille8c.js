function grille(){
	let t = ligne*colonne;
	let n = Math.floor(t/2);
	let valeur =tirage(n,255);
	let ordre=tirage(t,t);
	let cartes= new Array(t);
	for(let i=0;i<t;i++){
		cartes[i] = (ordre[i]<n) ? valeur[ordre[i]] : valeur[ordre[i]%n];
	}
    root.style.setProperty("--nbcolonne", colonne);
    gridContainer.replaceChildren();
	for (let i = 0; i < ligne; i++) {
	  for (let j = 0; j < colonne; j++) {
		let k=j+colonne*i;
		let gridItem = document.createElement('div');
		gridItem.className = 'grid-item';
		gridItem.id=`id${k}`;
		gridContainer.appendChild(gridItem);	
		const gridcanvas = document.createElement('canvas');
		gridcanvas.width='80';
		gridcanvas.height='80';
		gridcanvas.className = 'grid-canvas';
		gridcanvas.id=`canid${k}`;

		dictidtonum[gridcanvas.id]=cartes[k];
		
		gridItem.appendChild(gridcanvas);
		let ctx = gridcanvas.getContext('2d');
		dessinedos(ctx);
		gridcanvas.addEventListener('click', clicksurcarte);

	  }
	}
}