'use strict';

function SlidyPages({pages, touchThreshold}) {
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	const keys = {37: 1, 38: 1, 39: 1, 40: 1, 32:1, 33:1, 34:1, 35:1, 36:1};
	const _pages = pages;
	const _threshold = touchThreshold || 60;
	const _container = document.getElementById("slidy-container");
	let startTouch = {x: 0, y: 0};
	let lastTouch = {x: 0, y: 0};
	let timeOut;
	let scrollAvg = 0;
	let isScrolling = false;
	let scrollCount = 0;

	if (!_pages || !_container) {
		return;
	}

	function addPagination() {
		let html = '<div id="slidy-pagination">\n';
		for (let i = 0; i < _pages; i++) {
			html += `<div class="radio-container">
						<input type="radio" name="slidy-page" id="page${i+1}" ${i == 0 ? "checked" : ""}>
						<div class="selector"></div>
					</div>`;
		}
		html += '</div>';
		_container.innerHTML = html + _container.innerHTML;
	}

	function addButtons() {
		_container.innerHTML = '<i id="scrollup" class="icon-up"></i><i id="scrolldown" class="icon-down"></i>' + _container.innerHTML;
	}

	function updatePagination(direction = undefined) {
		let radios = document.getElementById("slidy-pagination").children;
		let currentPageIndex = Math.round(window.pageYOffset/innerHeight);
		if(direction != undefined){
			if(typeof(direction) === "number"){
				currentPageIndex = direction;
			}else{
				if(isScrolling){
					if(direction === "up"){
						currentPageIndex -= 1;
					}else if(direction === "down"){
						currentPageIndex += 1;
					}
				}
			}
		}

		_container.setAttribute("attr-page", currentPageIndex);

		for(let i = 0; i < radios.length; i++){
			radios[i].children[0].checked = false;
			if(i === currentPageIndex){
				radios[i].children[0].checked = true;
			}
		}
		if(currentPageIndex === pages - 1){
			document.getElementById("scrolldown").setAttribute('hidden', 'hidden');
		}else{
			document.getElementById("scrolldown").removeAttribute('hidden');
		}
		if(currentPageIndex === 0){
			document.getElementById("scrollup").setAttribute('hidden', 'hidden');
		}else{
			document.getElementById("scrollup").removeAttribute('hidden');
		}
		return currentPageIndex;
	}
	
	function addClickListeners(){
		let radios = document.getElementById("slidy-pagination").children;
		for(let i = 0; i < radios.length; i++){
			radios[i].children[0].addEventListener('click', function(e){
				scrollAction(e.target.id.substr(4) - 1);
			}, false);
		}
		document.getElementById("scrollup").addEventListener('click', function(e){
			scrollAction("up");
		}, true);
		document.getElementById("scrolldown").addEventListener('click', function(e){
			scrollAction("down");
		}, true);
	}
	
	function scrollingTimeOut(){
		setTimeout(function () { 
			isScrolling = false;
			scrollCount = 0;
			let currentPageIndex = Math.round(window.scrollY/innerHeight);
			window.scroll({top: innerHeight*currentPageIndex});
		}, 600);
	}
	
	function scrollAction(direction) {
		scrollCount += 1;
		if(scrollCount > 3 && isScrolling) {
			isScrolling = false;
			scrollCount = 0;
		}
		if(!isScrolling){
			isScrolling = true;
			if(typeof(direction) === "number"){
				window.scroll({top: innerHeight*direction, behavior: "smooth"});
				updatePagination(direction);
				isScrolling = false;
			}else{
				if(direction === "down"){
					if(window.pageYOffset < window.innerHeight*(pages-1)){
						window.scroll({top: pageYOffset + innerHeight, behavior: "smooth"});
						scrollingTimeOut();
						updatePagination(direction);
					}
				}else if(direction === "up"){
					if(window.pageYOffset > 0){
						window.scroll({top: pageYOffset - innerHeight, behavior: "smooth"});
						scrollingTimeOut();
						updatePagination(direction);
					}
				}
			}
		}
	}
	
	function getScrollableParent(element, limit = document.body.parentElement) { 
		if(element === limit) return null;
		if(element.hasAttribute('scrollable'))
			return element;
		return getScrollableParent(element.parentElement);
	}
	
	function preventDefault(e) {
		e.preventDefault();
		if(e instanceof KeyboardEvent) {
			if(e.key === "ArrowDown" || e.key === "PageDown"){
				scrollAction("down");
			}else if(e.key === "ArrowUp" || e.key === "PageUp"){
				scrollAction("up");
			}
		}else if (e instanceof WheelEvent) {
			scrollAvg += e.deltaY;
			clearTimeout(timeOut);
			timeOut = setTimeout(function () { 
				if(scrollAvg === -1 || scrollAvg === 1) scrollAvg = 0;
				//stopped scrolling
				if(scrollAvg > 0){
					scrollAction("down");
				}else if(scrollAvg < 0){
					scrollAction("up");
				}
				scrollAvg = 0;
			}, 50);
		}else if (e instanceof TouchEvent){
			if(e.touches.length != 1) return;
			if(e.touches[0].screenY > 0){
				lastTouch.y = e.touches[0].screenY;
			}
			if(Math.abs(e.touches[0].screenX) > 0){
				lastTouch.x = e.touches[0].screenX;
			}
			if(startTouch.x != 0) {
				let horizontalScrollElement = getScrollableParent(e.target);
				if(horizontalScrollElement != null){
					horizontalScrollElement.scroll({left: horizontalScrollElement.scrollLeft + (startTouch.x - lastTouch.x)/10});
				}
			}
		}
	}
	
	function touchStart(e){
		startTouch.y = e.touches[0].screenY;
		startTouch.x = e.touches[0].screenX;
	}
	
	function touchEnd(e) { 
		if(lastTouch.y === 0) return;
		let diff = lastTouch.y - startTouch.y
		if(diff < 0 && Math.abs(diff) >= _threshold){
			scrollAction("down");
		}else if(diff > 0 && Math.abs(diff) >= _threshold){
			scrollAction("up");
		}
		lastTouch.y = 0;
		startTouch.x = 0;
		lastTouch.x = 0;
	}
	
	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}
	
	// modern Chrome requires { passive: false } when adding event
	let supportsPassive = false;
	try {
		window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
			get: function () { supportsPassive = true; } 
		}));
	} catch(e) {}
	
	let wheelOpt = supportsPassive ? { passive: false } : false;
	let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

	function disableScroll() {
		window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
		window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
		window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
		window.addEventListener('keydown', preventDefaultForScrollKeys, false);
		window.addEventListener('touchstart', touchStart, false);
		window.addEventListener('touchend', touchEnd, false);
	}

	function updateOffset(){
		let e = document.createElement('div');
		e.style.cssText = 'position: fixed; top: 0; height: 100vh; pointer-events: none';
		document.documentElement.insertBefore(e, document.documentElement.firstChild);
		let offset = e.offsetHeight - window.innerHeight;
		document.documentElement.removeChild(e);
		document.documentElement.style.setProperty('--vh-offset', offset + 'px');
	}

	window.addEventListener('resize', (event) => {
		updateOffset();
		let currentPage = updatePagination();
		scrollAction(currentPage);
	});

	updateOffset();
	addButtons();
	addPagination();
	disableScroll();
	updatePagination();
	addClickListeners();
	window.__forceSmoothScrollPolyfill__ = true;
}