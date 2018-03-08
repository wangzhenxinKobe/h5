(function() {

	//设置默认的参数 配置
	var config = {
		width: 350,
		height: 350,
		borderWidth: 1,
		borderColor: "black"
	}

	//创建插件函数
	$.fn.extend({
		"glass": function(gconfig) {
			//合并参数
			var newconfig = $.extend(config, gconfig);

			return this.each(function() {
				
				//获取当前的JQ对象
				var $this = $(this);
				
				//获取元素
				var $glasswrap = $this;
				var $glasssmallwrap = $this.find(".glass-small-wrap");
				var $glassimgsmall = $this.find(".glass-img-small");
				var $glassbox = $this.find(".glass-box");
				var $glassbigwrap = $this.find(".glass-big-wrap");
				var $glassimgbig = $this.find(".glass-img-big");

				//合并参数
				var newconfig = $.extend(config, gconfig);

				//设置放大镜容器样式
				$glasswrap.css({
					position: "relative",
					top: 0,
					left: 0
				});

				//设置放大镜小图容器样式
				$glasssmallwrap.css({
					width: newconfig.width + "px",
					height: newconfig.height + "px",
					border: newconfig.borderWidth + "px solid " + newconfig.borderColor,
					position: "absolute",
					top: 0,
					left: 0

				});

				//设置放大镜大图容器样式
				$glassbigwrap.css({
					width: newconfig.width + "px",
					height: newconfig.height + "px",
					border: newconfig.borderWidth + "px solid " + newconfig.borderColor,
					position: "absolute",
					top: 0,
					left: newconfig.width + 2 * newconfig.borderWidth,
					overflow: "hidden",
					display: "none"
				});

				//设置小图的样式
				$glassimgsmall.css({
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				});

				//设置大图的样式
				$glassimgbig.css({
					position: "absolute",
					top: 0,
					left: 0
				});

				//设置放大镜的样式
				$glassbox.css({
					width: "100px",
					height: "100px",
					backgroundColor: "skyblue",
					opacity: "0.3",
					position: "absolute",
					top: 0,
					left: 0,
					display: "none"
				})

				//当鼠标移入显示放大镜和大图容器
				$glasssmallwrap.on("mouseover", function() {
					$glassbigwrap.show();
					$glassbox.show();
				});
				//当鼠标移出隐藏放大镜和大图容器
				$glasssmallwrap.on("mouseout", function() {
					$glassbigwrap.hide();
					$glassbox.hide();
				});

				//移动
				$glasssmallwrap.on("mousemove", function(e) {
					
					//获取鼠标当前位置
					var mX = e.pageX - $glasssmallwrap.offset().left;
					var mY = e.pageY - $glasssmallwrap.offset().top;

					//计算放大镜的移动范围
					var moveX = $glasssmallwrap.width() - $glassbox.width();
					var moveY = $glasssmallwrap.height() - $glassbox.height();

					//设置放大镜临时位置
					var tempX = mX - $glassbox.width() / 2;
					var tempY = mY - $glassbox.height() / 2;

					//设置最终位置
					var nowX = 0;
					var nowY = 0;
					if(tempX >= moveX) {
						nowX = moveX;
					} else if(tempX > 0 && tempX < moveX) {
						nowX = tempX;
					}

					if(tempY >= moveY) {
						nowY = moveY;
					} else if(tempY > 0 && tempY < moveY) {
						nowY = tempY;
					}

					$glassbox.css({
						"left": nowX,
						"top": nowY
					});

					//计算放大镜的位置比例
					var ratioX = $glassbox.position().left / $glasssmallwrap.width();
					var ratioY = $glassbox.position().top / $glasssmallwrap.height();

					//console.log("position:"+ $glassbox.position().top+"   offset:"+ $glassbox.offset().top)
					
					//设置大图的位置
					$glassimgbig.css({
						left: -ratioX * $glassimgbig.width(),
						top: -ratioY * $glassbigwrap.height()
					});

				});
			});
		}
	});

})();