function startMove(obj, json, fun) {
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var stop = true;
		//遍历json中的属性
		for(var arr in json) {

			//arr属性名
			//json[arr]属性值

			//获取当前量
			var offsetValue = arr == "opacity" ? Math.round(parseFloat(getStyle(obj, arr)) * 100) : parseInt(getStyle(obj, arr));
			//获取目标量
			var itarget = parseInt(json[arr]);

			//计算变化速度
			var speed = (itarget - offsetValue) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//当前量不等于目标量时
			if(itarget != offsetValue) {
				stop = false;
			}
			//当修改属性为opacity时
			if(arr == "opacity") {
				obj.style.opacity = (offsetValue + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (offsetValue + speed) + ")";

			} else {

				offsetValue += speed;
				obj.style[arr] = offsetValue + "px";
			}
		}

		//当所有属性都达到目标量时停止动画
		if(stop) {
			clearInterval(obj.timer);
			if(fun) {
				fun();
			}
		}

	}, 20);
}

//获取非行间样式函数
function getStyle(obj, name) {
	if(obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, null)[name];
	}
}