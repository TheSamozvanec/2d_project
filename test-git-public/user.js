'use strict'
//простые фигуры class Figura (figura,arr,s='black',f=false)
// 1 параметр - тип фигуры
// 2 параметр - размеры в массиве
// 3 s - strokeStyle
//графическкий объект ((figur,type,x0,y0,deg=0,vx=0,vy=0,vd=0))
//очистка экрана cls(canv)
//вывод объекта на экран с указанием ctx
let canv=document.querySelector('canvas'),
	ctx=canv.getContext('2d'),

	obj0=new Graph(new Figura('circle',[50],'','green'),'dynamic',200,200,rad(-30),5,3),
	//---
	obj1=new Graph(new Figura('rectangle',[100,50],'red'),'dynamic',500,300,0,5,2,rad(-5)),
	obj2=new Graph(new Figura('rectangle',[120],'','blue'),'dynamic',800,150,0,-1,4,rad(1)),
	obj3=new Graph(new Figura('line',[50,0]),'dynamic',600,250,0,3,0,rad(-8)),
	obj4=new Graph(new Figura('line',[50,0],'blue'),'dynamic',600,250,0,0,3,rad(-8)),
	//---
	obj5=new Graph(new Figura('rectangle',[80],'','rgb(250,250,0)'),'static',500,150,rad(20)),
	
	
	
	obj7=new Graph(new Figura('rectangle',[900,300],'red'),'static',550,250,10),
	obj8=new Graph(new Figura('circle',[20],'','red'),'dynamic',500,200,rad(-30),1,3),

	obj6=new Graph(new Figura('line',[-300,250],'green'),'static',400,100,rad(0)),
	obj9=new Graph(new Figura('line',[-300,250],'red'),'static',500,300,rad(-90)),

	map=[obj0,obj1,obj2,obj3,obj4,obj5,obj6,obj7,obj8], //глобальная переменнная - массив созданных объектов
	// переменная исппользуется в мониторе, в цикле обновления кадров и в методах проверки контакта объектов
	map1=[obj0,obj6,obj9,obj8],
	map2=[obj6,obj9],
	keyCode=false; 
obj1.name='rect x2';
obj5.name='static-square';

document.addEventListener('keydown',function(ev){keyCode=ev.code})
document.addEventListener('keyup',function(ev){keyCode=false})
function move(){ 
	if (keyCode=='KeyZ')return
	cls(canv);
	for (let el of map){
		el.step()
		getRealFigura(el).print(ctx);	
	}
}
//move();
setInterval(move,10)
//test test