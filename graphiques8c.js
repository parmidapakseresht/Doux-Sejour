// ces fonctions n'utilisent pas de variables globales

function polygon(ctx,n,x,y,r,ctx_s,ctx_l,ctx_f) {
	let theta = 2*Math.PI/n;
	let sint = Math.sin(theta);
	let cost = Math.cos(theta);
	const rot = math.matrix([[cost, -sint], [sint, cost]]);
	let vertex=math.matrix([1,0]);
	ctx.beginPath();
	ctx.moveTo(x + r, y );
	for(let i = 1; i < n; i++) {
		vertex = math.multiply(rot, vertex);
		ctx.lineTo(x + r*vertex.get([0]),y + r*vertex.get([1]));
	}
	ctx.closePath();
	ctx.strokeStyle=ctx_s;
	ctx.lineWidth=ctx_l;
	ctx.fillStyle=ctx_f;
	ctx.fill();
	ctx.stroke();	
};

function dessinedos(ctx){
	ctx.clearRect(0, 0, 80, 80);
}

function dessineface(ctx,k){
	let ctx_strokeStyle;
	let ctx_lineWidth;
	let ctx_fillStyle;
	// on récupère par modulo les différents entiers

	let remainder1 = k % 4;
	// choisir la couleur du bord
	switch(remainder1){
		case 0:
		ctx_strokeStyle = 'red';
		break;
		case 1:
		ctx_strokeStyle = 'green';
		break;
		case 2:
		ctx_strokeStyle = 'blue';
		break;
		default:
		ctx_strokeStyle = 'orange';;
	}
	let quotient1 = Math.floor(k / 4);
	let remainder2 = quotient1 % 4;
	// choisir l'epaisseur du contour
	switch(remainder2){
		case 0:
		ctx_lineWidth = 3;
		break;
		case 1:
		ctx_lineWidth = 7;
		break;
		case 2:
		ctx_lineWidth = 11;
		break;
		default:
		ctx_lineWidth = 15;
	}	
	let quotient2 = Math.floor(quotient1 / 4);
	let remainder3 = quotient2 % 4;
	// choisir la couleur de l'interieur
	switch(remainder3){
		case 0:
		ctx_fillStyle = 'grey';
		break;
		case 1:
		ctx_fillStyle = 'yellow';
		break;
		case 2:
		ctx_fillStyle = 'purple';
		break;
		default:
		ctx_fillStyle = 'cyan';
	}	
	let quotient3 = Math.floor(quotient2 / 4);
	let remainder4 = quotient3 % 4;
	// choisir la forme
	let n=remainder4 + 3;
	polygon(ctx,n,41,40,20,ctx_strokeStyle,ctx_lineWidth,ctx_fillStyle);
}

