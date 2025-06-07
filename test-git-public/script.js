'use strict'
//основной скрипт
//движок внешнекго вида
;(function() {
	let canvas=document.querySelector('canvas'), 	// доска для рисования (холст)
		monitor =document.querySelector('div'), 	// монитор (в html div)
		tog=document.querySelector('button'), 		// выключатель монитора (в html батон)
		sel=document.querySelectorAll('select'),	// настройки монитора (в html 2 select-а)
		keyCode=false,								// код нажатой клавиши для мониторнга 
		canX=0,canY=0;								// примерные координаты мышки на canvas (для удобства)
		//map=[obj0];									// массив объектов - сюда необходимо записать созданные графические объекты
													// этот массив прочитает селектоор монитора для отслеживания параметров

	//функции работы манитора
	function monitorConvas(){
		let tab=document.createElement('table'),
			cap=document.createElement('caption'),

			tr1=document.createElement('tr'),
			td1=document.createElement('td'),
			td2=document.createElement('td'),

			tr2=document.createElement('tr'),
			td3=document.createElement('td'),
			td4=document.createElement('td'),

			tr3=document.createElement('tr'),
			td5=document.createElement('td'),
			td6=document.createElement('td'),

			tr4=document.createElement('tr'),
			td7=document.createElement('td'),
			td8=document.createElement('td'),

			tr5=document.createElement('tr'),
			td9=document.createElement('td'),
			td10=document.createElement('td');
		monitor.innerHTML='';
		cap.innerHTML='<b>canvas size:</b>';
		tab.width=580;tab.border=1;
		tab.appendChild(cap);
		monitor.appendChild(tab);
		
		td1.textContent='width';
		td2.textContent=canvas.width;
		tr1.appendChild(td1);tr1.appendChild(td2);
		tab.appendChild(tr1);
		
		td3.textContent='height';
		td4.textContent=canvas.height;
		tr2.appendChild(td3);tr2.appendChild(td4)
		tab.appendChild(tr2);

		td5.textContent='keyCode:';
		td6.textContent=keyCode;
		tr3.appendChild(td5);tr3.appendChild(td6)
		tab.appendChild(tr3);

		td7.textContent='canvasX:';
		td8.textContent=canX;
		tr4.appendChild(td7);tr4.appendChild(td8)
		tab.appendChild(tr4);

		td9.textContent='canvasY:';
		td10.textContent=canY;
		tr5.appendChild(td9);tr5.appendChild(td10)
		tab.appendChild(tr5);
	}												// монитор холста
	function monitorObject(){
		monitor.innerHTML='';
		let p=document.createElement('p'),
			obj=map[sel[0].value];
		p.textContent=obj.name+'-'+obj.type;
		monitor.appendChild(p);
		if (sel[1].value=='figura'){
			let tab=document.createElement('table'),
				cap=document.createElement('caption');
			cap.textContent='figura';
			tab.appendChild(cap);
			tab.width=580;
			tab.border=1;
			monitor.appendChild(tab);
			for(let cat of obj.figura){
				create(tab,cat);
			}
		} else {
			let tab1=document.createElement('table'),
				tab2=document.createElement('table'),
				tab3=document.createElement('table'),
				cap1=document.createElement('caption'),
				cap2=document.createElement('caption'),
				cap3=document.createElement('caption');
			cap1.textContent='real';
			tab1.appendChild(cap1);
			cap2.textContent='border: '+obj.borderType;
			tab2.appendChild(cap2);
			cap3.textContent='behavior';
			tab3.appendChild(cap3);
			tab1.width=580;tab1.border=1;
			tab2.width=580;tab2.border=1;
			tab3.width=580;tab3.border=1;
			monitor.appendChild(tab1);
			monitor.appendChild(tab2);
			monitor.appendChild(tab3);
			create(tab1,obj.real);
			for(let el of obj.border){
				create(tab2,el);
			}
			create(tab3,obj.behavior);
			}
		function create(tab,obj){
			let name=['ds','de','deg','vd','direct'],
				tr = document.createElement('tr');
			for(let key in obj){
				let 
					td1=document.createElement('td'),
					td2=document.createElement('td'),
					val=obj[key];
				if (name.some((i)=>i==key))val=deg(val).toFixed(2); 
				if (typeof(val)=='number') val=val.toFixed(4);
				td1.innerHTML='<b>'+key+'</b>';
				td2.innerHTML=val;
				tr.appendChild(td1);
				tr.appendChild(td2);
			}	
			tab.appendChild(tr);
		}
	}												// монитор объекта
	function showMonitor(){
		if (tog.classList.contains('off')) return;
		if (sel[0].value=='canvas'){
			monitorConvas();
			return;
		} 
		monitorObject();
	} 												// эта функция обновления монитора (каждые 100 мс)

	tog.addEventListener('click',function(ev){		
		this.classList.toggle('off');
		monitor.classList.toggle('off');
		sel[1].classList.toggle('off');
		sel[0].classList.toggle('off');
	});												// кнопка выключатель монитора и настроек манитора (если мешает)

	// реаализация возможности перетаскивания монитора
	function moveMonitor(ev){
		this.style.top=(ev.pageY-50)+'px';
		this.style.left=ev.pageX-100+'px';
	}												// перемещение монитора мышкой по экрану при нажатой кнопке мышки
	function stopMonitor(ev){
		monitor.removeEventListener('mousemove',moveMonitor);
		monitor.removeEventListener('mouseup',stopMonitor);
		monitor.addEventListener('mousedown',clickMonitor);
	}												// отпустить кнопку мышки
	function clickMonitor(ev){
		monitor.removeEventListener('mousedown',clickMonitor);
		monitor.addEventListener('mousemove',moveMonitor);
		monitor.addEventListener('mouseup',stopMonitor);
	}												// нажать (и удерживать) кнопку мышки для перетааскивания
	monitor.addEventListener('mousedown',clickMonitor); // подвешиваем в обработчик событие 'зацепить монитор'
	
	// прочие события для мониитора
	document.addEventListener('keydown',function(ev){keyCode=ev.code});
	document.addEventListener('keyup',function(ev){keyCode=false});
	canvas.addEventListener('mousemove',function(ev){canX=ev.clientX-12;canY=ev.clientY-91;});

	// запуск основного скрипта
	function createSelector(){
		for (let i=0;i<map.length;i++){
			let opt=document.createElement('option');
			opt.textContent=map[i].name;
			opt.value=i;
			sel[0].appendChild(opt);
		}
	} 												// заполнение сеелектора настроек монитора
	createSelector();
	showMonitor();
	setInterval(showMonitor,100);					// запуск монитора (обновление каждые  100 мс)	
})();

