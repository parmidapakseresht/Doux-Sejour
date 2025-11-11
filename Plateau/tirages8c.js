//tirage de p nombres entiers parmi les nombres de 0 à n-1
// la fonction retourne un array
function tirage(p,n){
	const tirages=[];
	const tab = [...Array(n).keys()];  
	let k=n;	
	for (let i = 0; i < p; i++) {	
		let randint=Math.floor(Math.random() * k);
		tirages.push(tab.splice(randint,1));
		k=k-1;
	}
	return tirages;
}