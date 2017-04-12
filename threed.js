
var width=20;
var height=20;
var depth=20;

var grid=new Array(width);
for(var x = 0; x<width; x++){
  grid[x]=new Array(height);
  for(var y = 0; y<height; y++){
    grid[x][y]=new Array(depth);
		for(var z = 0; z<depth; z++){
			grid[x][y][z]=0;
		}
  }
}
var path=[];
var treesize=16;
var start_positions=[8,8,8];
var roots=[];
function quadTree(){
	var depth=0;
	var startx=start_positions[0];
	var starty=start_positions[1];
	var startz=start_positions[2];
	grid[startx][starty][startz]+=1;
	roots.push([]);
	roots[0].push([startx,starty,startz]);
	roots.push([]);
	roots[1].push(growbranch(startx,starty,startz,treesize,1));
	while(true){
		var prev=depth;
		for(var a = 0; a<roots[0].length; a++){
			var posx=roots[0][a][0];
			var posy=roots[0][a][1];
			var posz=roots[0][a][2];
			var path=roots[1][a];
			search_opendirrs(posx,posy,posz,path);
		}
		depth=roots[0].length;
		if(prev==depth){
			break;
		}
		}
	return roots;
}

function search_opendirrs(posx, posy, posz, path){
	var openings=0;
	var skips=0;
	var dirr=-1;
	for(var x = 0; x<path.length; x++) {
		var dirr=path[x];
		var openings=0;
		for(var y = 0; y<6; y++){
			openings+=checkgrid2(posx,posy,posz,y);
		}
		if(openings<=2){
			skips+=1;
		}
		if(skips==3){
			for(var z =0; z<6; z++){
				if(checkgrid2(posx,posy,posz,z)==0){
					newpath=growbranch(posx,posy,posz,treesize,z);
					roots[0].push([posx,posy,posz]);
					roots[1].push(newpath);
				}
			}
			return 0;
		}
		if(dirr==0){
			posy+=1
		}
		if(dirr==1){
			posx+=1
		}
		if(dirr==2){
			posy-=1
		}
		if(dirr==3){
			posx-=1;
		}
		if(dirr==4){
			posz+=1;
		}
		if(dirr==5){
			posz-=1;
		}
	}
}

function growbranch(posx, posy, posz, length, initdirr){
	var branch_path=[];
	var dirr=initdirr;
	for(var i = 0; i<length; i++) {
		var dirr=dont_turn_back(initdirr,dirr);
		if(i<8){
			dirr=initdirr;
		}
		var n=0;
		while(checkgrid2(posx,posy,posz,dirr)){
			if(n>100){
				return branch_path;
			}
			dirr=dont_turn_back(initdirr,dirr);
			n+=1;
		}
		if(dirr==0){
			posy+=1
		}
		if(dirr==1){
			posx+=1
		}
		if(dirr==2){
			posy-=1
		}
		if(dirr==3){
			posx-=1;
		}
		if(dirr==4){
			posz+=1;
		}
		if(dirr==5){
			posz-=1;
		}
		grid[posx][posy][posz]+=1;
		branch_path.push(dirr);
	}
	return branch_path;
}

//returns 1 if grid pos is taken
function checkgrid2(posx,posy,posz,dirr){
	if(dirr==0){
		if(grid[posx][posy+1][posz]>0 || posy>height-3){
			return 1;
		}
		var two=0;
		for(var x = 0; x<6; x++){
			if(checkgrid3(posx,posy+1,posz,x)==1){
				two+=1;
			}
			if(two>1){
				return 1;
			}
		}
		return 0;
	}
	if(dirr==1){
		if(grid[posx+1][posy][posz]>0 || posx>width-3){
			return 1;
		}
		var two=0;
		for(var x = 0; x<6; x++){
			if(checkgrid3(posx+1,posy,posz,x)==1){
				two+=1;
			}
			if(two>1){
				return 1;
			}
		}
		return 0;
	}
	if(dirr==2){
		if(grid[posx][posy-1][posz]>0 || posy<2){
			return 1;
		}
		var two=0;
		for(var x = 0; x<6; x++){
			if(checkgrid3(posx,posy-1,posz,x)==1){
				two+=1;
			}
			if(two>1){
				return 1;
			}
		}
		return 0;
	}
	if(dirr==3){
		if(grid[posx-1][posy][posz]>0 || posx<2){
			return 1;
		}
		var two=0;
		for(var x = 0; x<6; x++){
			if(checkgrid3(posx-1,posy,posz,x)==1){
				two+=1;
			}
			if(two>1){
				return 1;
			}
		}
		return 0;
	}
	if(dirr==4){
		if(grid[posx][posy][posz+1]>0 || posz>depth-3){
			return 1;
		}
		var two=0;
		for(var x = 0; x<6; x++){
			if(checkgrid3(posx,posy,posz+1,x)==1){
				two+=1;
			}
			if(two>1){
				return 1;
			}
		}
		return 0;
	}
	if(dirr==5){
		if(grid[posx][posy][posz-1]>0 || posz<2){
			return 1;
		}
		var two=0;
		for(var x = 0; x<6; x++){
			if(checkgrid3(posx,posy,posz-1,x)==1){
				two+=1;
			}
			if(two>1){
				return 1;
			}
		}
		return 0;
	}
}


//returns 1 if grid pos is taken
function checkgrid3(posx,posy,posz,dirr){
	if(dirr==0){
		if(posy<1){
			return 1;
		}
		if(grid[posx][posy+1][posz]>0){
			return 1;
		}	else { return 0;}
	}
	if(dirr==1){
		if(posy<1){
			return 1;
		}
		if(grid[posx+1][posy][posz]>0){
			return 1;
		}	else { return 0;}
	}
	if(dirr==2){
		if(posy<1){
			return 1;
		}
		if(grid[posx][posy-1][posz]>0){
			return 1;
		}	else { return 0;}
	}
	if(dirr==3){
		if(posy<1){
			return 1;
		}
		if(grid[posx-1][posy][posz]>0){
			return 1;
		}	else { return 0;}
	}
	if(dirr==4){
		if(posy<1){
			return 1;
		}
		if(grid[posx][posy][posz+1]>0){
			return 1;
		}	else { return 0;}
	}
	if(dirr==5){
		if(posy<1){
			return 1;
		}
		if(grid[posx][posy][posz-1]>0){
			return 1;
		}	else { return 0;}
	}
}

function dont_turn_back(initdirr,dirr){
	if(Math.random()<0.33){
		return initdirr;
	}
	return Math.floor(Math.random() * 6);
}

function getGrid(){
	return grid;
}

function top_left(){
	for(var x = 0; x<width; x++){
		for(var y = 0; y<height; y++){
			if(grid[y][x]){
				return x,y;
			}
		}
	}
	return -1;
}

//if back and forth continue, dont put
