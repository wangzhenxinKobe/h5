function mouseWheel(obj,fun){
	var firefox = navigator.userAgent.indexOf("Firefox")>0;
	if(firefox){
		obj.addEventListener("DOMMouseScroll",hh,false);
	}else{
		obj.onmousewheel = hh;
	}
	
	function hh(e){
		var e = e || window.event;
		var down = true;
		
		if(e.detail){
			if(e.detail<0){
				 down = false;
			}
		}else{
			if(e.wheelDelta>0){
				down = false;
			}
		}
		fun(down)
	}
}
