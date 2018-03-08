var oTextArea = document.getElementById("textarea");
var oLibao = document.getElementById("libao");
var oBtnSend = document.getElementById("btn_send");
var oMain = document.getElementById("main");
//当获得焦点时
oTextArea.onfocus = function() {
		comWordsNum();
	}
	//失去焦点时
oTextArea.onblur = function() {
		if(this.value.trim().length > 0) {
			comWordsNum();
		} else {
			oLibao.innerHTML = "点击领取礼包";
			oLibao.style.color = "";
		}
	}
	//按键事件
oTextArea.onkeyup = function() {
	comWordsNum();
}

function comWordsNum() {
	var max = 140;
	var textlen = oTextArea.value.trim().length;
	if(textlen > 0) {
		oBtnSend.style.opacity = "1";
	} else {
		oBtnSend.style.opacity = "0.5";
	}
	//当输入的字符长度小于等于最大可输入数值时
	if(textlen <= max) {
		oLibao.innerHTML = "您还可以输入" + (max - oTextArea.value.length) + "个字";
		oLibao.style.color = "#cccccc";
	} else {
		//当输入的字符长度超出范围，截取
		oTextArea.value = oTextArea.value.trim().substr(0, max);
	}
}

//发布按钮
oBtnSend.onclick = function() {
	if(oTextArea.value.trim().length > 0) {
		//调用添加消息函数
		AddItem();
	}
}

//添加消息函数
function AddItem() {
	var oItem = document.createElement("div");
	var oItemTop = document.createElement("div");
	var oItemMain = document.createElement("div");
	var oItemBottom = document.createElement("div");
	var oItemDel = document.createElement("div");

	//设置内容
	oItemTop.innerHTML = "江疏影";
	oItemMain.innerHTML = oTextArea.value.trim();
	oItemBottom.innerHTML = getDate() + "发布";
	oItemDel.innerHTML = "X";
	
	//添加删除事件
	oItemDel.onclick = function(){
		this.parentNode.timer=null;
		delAnimate(this.parentNode);
	}

	//设置class
	oItem.className = "item";
	oItemTop.className = "item_top";
	oItemMain.className = "item_main";
	oItemBottom.className = "item_bottom";
	oItemDel.className = "item_del";

	//添加元素
	oItem.appendChild(oItemTop);
	oItem.appendChild(oItemMain);
	oItem.appendChild(oItemBottom);
	oItem.appendChild(oItemDel);

	//添加当前项到main中
	oMain.insertBefore(oItem, oMain.firstChild);

	//动画效果
	oItem.timer = null;
	addAnimate(oItem);
}

//添加项的动画效果
function addAnimate(obj) {
	var t = 0; //当前时间 当前的步数0 
	var b = -200; //初始的值 
	var c = 200; //变化的量
	var d = 40; //所需时间 20
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		t++;
		if(t>d){
			clearInterval(obj.timer);
		}else{
			
			obj.style.top = Tween.Back.easeOut(t, b, c, d) + "px";
		}
	}, 20)
}

//删除项的动画效果
function delAnimate(obj){
	var t = 0; //当前时间 当前的步数0 
	var bW = obj.offsetWidth; //初始的值
	var bH = obj.offsetHeight; //初始的值
	var cW = -obj.offsetWidth; //变化的量
	var cH = -obj.offsetHeight; //变化的量
	var d = 20; //所需时间 20
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		t++;
		if(t>d){
			clearInterval(obj.timer);
			obj.parentNode.removeChild(obj);
		}else{
			obj.style.width = Tween.Linear(t, bW, cW, d) + "px";
			
			obj.style.height = Tween.Linear(t, bH, cH, d) + "px";
		}
	}, 20)
}


//创建日期函数
function getDate() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	return year + "年" + month + "月" + day + "日";
}