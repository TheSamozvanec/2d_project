'use strict'
//Библиотека классов и функций
//let map=[obj0,obj1,obj2,obj3,obj4,obj5,obj6];// переменную использует также монитор и файл user
class Figura{
	#figures=['circle','rectangle','line','triangle','ball','free'];
	constructor(figura,arr,s='black',f=false){							//входные параметрытип фигуры, характеристики, цвета
		this.name='standart-'+figura;									
		switch (figura){
			case 'tringle':
			//
			break;
			case 'circle':
			this.figura=[{x:0,y:0,r:arr[0],ds:0,de:Math.PI*2,s,f}];		//координаты шаблона
			this.borderType='circle';									//тип границы
			this.print=function(ctx){									//метод рисования фигуры
				let arr=this.figura,
					{x,y,r,ds,de,s,f}=arr[0];
				ctx.beginPath();
				if (f){ctx.fillStyle=f}else {ctx.strokeStyle=s}
				ctx.arc(x,y,r,ds,de,false);
				if (f){ctx.fill()}else{ctx.stroke()};
			}
			break;
			case 'rectangle':
			if (arr.length>1){
				this.figura=[{x:arr[0]/2*-1,y:arr[1]/2*-1}, 
							{x:arr[0]/2,y:arr[1]/2*-1},
							{x:arr[0]/2,y:arr[1]/2},
							{x:arr[0]/2*-1,y:arr[1]/2,s,f},
							{x:arr[0]/2*-1,y:arr[1]/2*-1},
							];
			} else {
				this.figura=[{x:arr[0]/2*-1,y:arr[0]/2*-1}, 
							{x:arr[0]/2,y:arr[0]/2*-1},
							{x:arr[0]/2,y:arr[0]/2},
							{x:arr[0]/2*-1,y:arr[0]/2,s,f},
							{x:arr[0]/2*-1,y:arr[0]/2*-1},
							];
			}
			this.borderType='line'
			this.print=function(ctx){
				let arr=this.figura;
				ctx.beginPath();
				ctx.moveTo(arr[0].x,arr[0].y);
				ctx.lineTo(arr[1].x,arr[1].y);
				ctx.lineTo(arr[2].x,arr[2].y);
				ctx.lineTo(arr[3].x,arr[3].y);
				if(arr[3].f){
					ctx.fillStyle=arr[3].f;
					ctx.strokeStyle=arr[3].f;
					ctx.fill();
					} else {
					ctx.strokeStyle=arr[3].s;
					ctx.closePath();
					}
					ctx.stroke();
				}
			break;
			case 'ball':
			//
			break;
			case 'line':
			this.figura=[{x:0,y:0},{x:arr[0],y:arr[1],s}];
			this.borderType='line'
			this.print=function(ctx){
				ctx.beginPath();
				ctx.moveTo(this.figura[0].x,this.figura[0].y);
				ctx.lineTo(this.figura[1].x,this.figura[1].y);
				ctx.strokeStyle=this.figura[1].s;
				ctx.stroke();
			}
			break;
		}
	this.figura[Symbol.iterator]=Destruct;
	this.border=[...this.figura];
	}
	
}
class Graph{
	constructor(figur,type,x0,y0,deg=0,vx=0,vy=0,vd=0){
		let {name,figura,borderType,border,print}=figur;
		this.name=name;
		this.type=type;
		this.figura=figura;
		this.borderType=borderType;
		this.border0=border;
		this.border0[Symbol.iterator]=Destruct0;
		this.border=[...this.border0];
		this.print=print;
		this.real={x0,y0,deg};
		this.behavior={vx,vy,vd};
		this.setParam();
		switch (type+'-'+borderType){
			case 'dynamic-circle': 
				this.setBorder=setBorderCircle;
				this.step=function(){
					let {x0:x,y0:y,deg}=this.real, //загрузка параметров
						flag=false,// contact=false,//флаги
						r=this.border[0].r,
						{k:kb,b:bb,direct,vx,vy,vd,v}=this.behavior;
					// for (let obj of map){ //перебераем все созданные объекты (внесенные в масив) 
					// 		if (obj==this/* || obj.type!='static'*/) continue; // если сам-не проверяем
					// 		for (let i=1; i<obj.border.length; i++) {	//перебераем  границы объекта-препятствия
					// 			let {k:ka,b:ba,x:x1,y:y1}=obj.border[i], //деструктуризация границы препятствия
					// 			{x:x0,y:y0}=obj.border[i-1]; // десструктризация предыдущейй точки препятствия
					// 		if (ka!=kb && isFinite(ka) && isFinite(kb)){ // проверка на параллельность и 90гр
					// 			let XC=(bb-ba)/(ka-kb),// x пересечениия траектории и препятствия
					// 				//K90=Math.atan(ka)+Math.PI/2, // коэффициент коррекции на радиус (90гр к препятствию)
					// 				YC=XC*ka+ba,
					// 				DirA=Math.atan(ka), 
					// 				contact=false; // флаг контакта
					// 			//if (XC>=Math.min(x0,x1) && XC<=Math.max(x0,x1)){ // проверка интервала персечения функций
					// 				if (vx>0){	// если движение слева направо
					// 					let XR=Math.cos(DirA+Math.PI/2)*r+XC,
					// 						YR=Math.sin(DirA+Math.PI/2)*r+YC, //отступ от точки пересечения на Pi/2
					// 						br=YR-ka*XR; // b смещенной функции препятствия
					// 					XR=(bb-br)/(ka-kb);
					// 					x0=Math.cos(DirA+Math.PI/2)*r+x0;
					// 					x1=Math.cos(DirA+Math.PI/2)*r+x1;
					// 					if (XR>=Math.min(x0,x1) && XR<=Math.max(x0,x1)){
					// 						if(x+vx>=XR && x<XR){contact=true}
					// 					}
										
					// 				} else if(vx<0){	//если движение справа налево
					// 					let XR=Math.cos(DirA-Math.PI/2)*r+XC,
					// 						YR=Math.sin(DirA-Math.PI/2)*r+YC, //отступ от точки пересечения на Pi/2
					// 						br=YR-ka*XR; // b смещенной функции препятствия
					// 					XR=(bb-br)/(ka-kb);
					// 					x0=Math.cos(DirA-Math.PI/2)*r+x0;
					// 					x1=Math.cos(DirA-Math.PI/2)*r+x1;
					// 					if (XR>=Math.min(x0,x1) && XR<=Math.max(x0,x1)){
					// 							if(x+vx<=XC && x>XC){contact=true}	
										
					// 				}
					// 			} 
					// 			if(contact){
					// 				direct=2*Math.atan(ka)-direct;
					// 				vx=Math.cos(direct)*v;
					// 				vy=Math.sin(direct)*v;
					// 				this.behavior.vx=vx;
					// 				this.behavior.vy=vy;
					// 				this.setParam();
					// 			}
					// 		//}
					// 		} else if (!isFinite(ka) && ka!=kb){
					// 			let contact=false;
					// 			if (y>=Math.min(y0,y1) && y<=Math.max(y0,y1)){

					// 				if (vx>0 && (x+vx)>=ba && x<ba){
										
					// 					//this.real.cx=XC;
					// 					//this.real.cy=kb*XC+bb;
					// 					contact=true;
					// 				} else if(vx<0 && (x+vx)<=ba && x>ba){

					// 					//this.real.cx=XC;
					// 					//this.real.cy=kb*XC+bb;
					// 					contact=true;
					// 				}
					// 				if (contact){
					// 					vx=-vx;
					// 					this.behavior.vx=vx;
					// 					this.setParam();
					// 				} 
					// 			}
					// 		} else if (!isFinite(kb) && ka!=kb) {
					// 			let YC=ka*x+ba,contact=false;

					// 			if (YC>=Math.min(y0,y1) && 
					// 				YC<=Math.max(y0,y1) && 
					// 				x>=Math.min(x0,x1) &&
					// 				x<=Math.max(x0,x1)){
					// 				//корректировка здесь
					// 				if (vy>0 && (y+vy)>=(YC-r) && y<(YC-r)){
					// 					//
					// 					contact=true;
					// 				} else if(vy<0 && (y+vy)<=(YC+r) && y>(YC+r)){
					// 					//
					// 					contact=true;
					// 				}
					// 				if(contact){
					// 					direct=2*Math.atan(ka)-direct;
					// 					vx=Math.cos(direct)*v;
					// 					vy=Math.sin(direct)*v;
					// 					this.behavior.vx=vx;
					// 					this.behavior.vy=vy;
					// 					this.setParam();
					// 				}

					// 			}
					// 		} 
							
					// 	}
					// }

					if (x<=r || x>=1180-r){
						vx*=-1;
						this.behavior.vx=vx; //сохранение vx если изменен
						flag=true;
					} 
					if(y<=r || y>=512-r){
						vy*=-1;
						this.behavior.vy=vy; // сохранение vy если изменён
						flag=true;
					}
					vd=deg>1.5*Math.PI || deg<-1.5*Math.PI? vd*-1:vd;
					this.behavior.vd=vd;
					x+=vx;y+=vy;deg+=vd;
					this.real={x0:x,y0:y,deg};
					if(flag) this.setParam();
					this.setBorder();
				}
			break;
			case 'dynamic-line':
				this.setBorder=setBorderLine
				this.step=function(){
					let {x0,y0,deg}=this.real, //загрузка параметров
						{vx,vy,vd}=this.behavior, 
						flag=false; //флаг
						//r=Math.sqrt ((this.border[2].x-this.border[0].x)**2+(this.border[2].y-this.border[0].y)**2)/2;
					if (x0<=0 || x0>=1180){
						vx*=-1;
						this.behavior.vx=vx; //сохранение vx если изменен
						flag=true;
					} 
					if (y0<=0 || y0>=512){
						vy*=-1;
						this.behavior.vy=vy; // сохранение vy если изменён
						flag=true;
					}
					vd=deg>1.5*Math.PI || deg<-1.5*Math.PI? vd*-1:vd;
					this.behavior.vd=vd;
					x0+=vx;y0+=vy;deg+=vd;
					this.real={x0,y0,deg};
					if(flag) this.setParam();
					this.setBorder();
				}
			break;
			case 'static-line':
			this.setBorder=setBorderLine;
			this.setBorder();
			this.realFigura=getRealFigura(this,true).figura
			this.step=function(){return};
		}
	}
	setParam(){
		let {vx,vy}=this.behavior,
			{x0,y0}=this.real,
			k=vy/Number(vx.toFixed(6)),
			v=Math.sqrt(vx**2+vy**2),
			cos=v!=0? vx/v:1,
			direct=vy>0? Math.acos(cos):-1*Math.acos(cos); 

		this.behavior.k=k;
		this.behavior.b=isFinite(k)? y0-k*x0:x0;
		this.behavior.v=v;
		this.behavior.direct=direct;
	}
}
function *Destruct(){ 
	for (let i=0;i<this.length;i++){
		let o={...this[i]};
		//delete o.f;delete o.s;
		yield o
	} 
} // Итератор для копирования структуры фигуры
function *Destruct0(){ 
	for (let i=0;i<this.length;i++){
		let o={...this[i]};
		delete o.f;delete o.s;
		yield o
	}  
}// итератор без цветовых параметров
function setBorderCircle(){
	this.border[0].x=this.real.x0;
	this.border[0].y=this.real.y0;
} // функция установки границ круга
function setBorderLine(){
	let {x0,y0,deg}=this.real;
	for (let i=0;i<this.border.length;i++){
		let l=(Math.sqrt(this.border0[i].x**2+this.border0[i].y**2)),
			cs0=this.border0[i].x/l,
			deg0=!isNaN(cs0)? Math.acos(cs0):0;
		deg0=this.border0[i].y<0? deg0*-1:deg0;
		let degI=deg0+deg;
		this.border[i].x=Math.cos(degI)*l+x0;this.border[i].y=Math.sin(degI)*l+y0;
	}
	for (let i=1;i<this.border.length;i++){
		let {x,y}=this.border[i],
			{x:x0,y:y0}=this.border[i-1],
			vx=x-x0,vy=y-y0,
			k=vy/vx,b=isFinite(k)? y0-k*x0:x0;
		this.border[i].b=b;
		this.border[i].k=k;
	}
} // функция установки границ линейного объекта
function rad(deg){return (Math.PI/180)*deg}; // перевод в радианы (для первичных параметров)
function deg(rad){return Number(((180/Math.PI)*rad).toFixed(3))}; //перевод в градусы 9используется монитором
function cls(canv){
	let ctx=canv.getContext('2d')
	ctx.clearRect(0,0,canv.width,canv.height);
} // очистить экран
function getRealFigura(obj,hard=false){
	if (obj.type=='static' && !hard){
		let res={};
		res.figura=obj.realFigura;
		res.print=obj.print;
		return res;
	}
	let res={},arr=[],{x0,y0,deg}=obj.real;
	for (let {x,y,r,ds,de,s,f} of obj.figura){
		let l=(Math.sqrt(x**2+y**2)),
			cs0=x/l,
			deg0=!isNaN(cs0)? Math.acos(cs0):0;
		deg0=y<0? deg0*-1:deg0;
		let degI=deg0+deg;
		if (r){ds+=degI;de+=degI}
		arr.push({'x':Math.cos(degI)*l+x0,'y':Math.sin(degI)*l+y0,'r':r,ds,de,s,f});
	}
	res.figura=arr;
	res.print=obj.print;
	return res
} // функция проецирует оъект. Пересчитываются координаты всех точек шаблона на реаальные с учетом угла.  
