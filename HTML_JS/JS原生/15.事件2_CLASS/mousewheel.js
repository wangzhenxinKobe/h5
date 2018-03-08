function MouseWheel(obj, fn) {
	//判断是否是火狐浏览器
	var firefox = navigator.userAgent.indexOf("Firefox") > 0

	if(firefox) {
		obj.addEventListener("DOMMouseScroll", progress, false);
	} else {
		obj.onmousewheel = progress;
	}

	function progress(e) {
		var e = e || window.event;
		//是否向下滚动 向下为true
		var down = true;

		if(e.detail) {
			if(e.detail < 0) {
				down = false;
			}
		} else {
			if(e.wheelDelta > 0) {
				down = false;
			}
		}
		//调用处理函数
		fn(down);
	}
}