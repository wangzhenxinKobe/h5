//设置cookie函数
function setCookie(keyname, keyvalue, days) {

	if(days) {
		var newdate = new Date();
		newdate.setDate(newdate.getDate() + days);
		document.cookie = keyname + "=" + keyvalue + ";expires=" + newdate.toGMTString();
	} else {
		document.cookie = keyname + "=" + keyvalue;
	}

}

//获取cookie
function getCookie(keyname) {
	var strcookie = document.cookie;
	var cookies = strcookie.split(";");
	var keyvalue = "";
	for(var i = 0; i < cookies.length; i++) {
		var keys = cookies[i].trim().split("=");
		if(keys[0] == keyname) {
			keyvalue = keys[1];
		}
	}
	return keyvalue;
}

//清除cookie
function removeCookie(keyname) {
	setCookie(keyname, "", -10);
}