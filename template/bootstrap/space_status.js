function statusFace() {
	if($('mood_message').value == '你可以更新状态, 让好友们知道你在做什么...'){
		$('mood_message').value = '';
	}
	$('mood_statusinput').style.zIndex = '20005';
	$('mood_form').style.zIndex = '10000';
	$('mood_add').style.display = 'inline-block';
/*
	if(jQuery.browser.msie && jQuery.browser.version === "7.0" ){
		jQuery('#mood_statusinput, #mood_message').css('width', '200px');
	}
*/
	var div = $('mood_face_bg');
	if(div) {
		div.parentNode.removeChild(div);
	}
	div = document.createElement('div');
	div.id = 'mood_face_bg';
	div.style.position = 'absolute';
	div.style.left = div.style.top = '0px';
	div.style.width = '100%';
	div.style.height = document.body.scrollHeight + 'px';
	div.style.backgroundColor = '#000';
	div.style.zIndex = 10000;
	div.style.display = 'none';
	div.style.filter = 'alpha(opacity=0)';
	div.style.opacity = 0;
	div.onclick = function() {
		hiddenstatus();
	}
	$('append_parent').appendChild(div);


	if($('mood_message_menu') != null) {
		$('mood_message_menu').style.display = '';
		$('mood_add').style.display = '';
	} else {
		var faceDiv = document.createElement("div");
		faceDiv.id = 'mood_message_menu';
		faceDiv.className = 'facebox';
		faceDiv.style.position = 'absolute';
		var faceul = document.createElement("ul");
		for(i=1; i<31; i++) {
			getStatusFace(i, faceul);	
		}
		faceDiv.appendChild(faceul);
		$('append_parent').appendChild(faceDiv);
	}
	//定位菜单
	setMenuPosition('mood_message', 0);
	div.style.display = '';
}

function hiddenstatus() {
	$('mood_message_menu').style.display = 'none';
	$('mood_face_bg').style.display = 'none';
	$('mood_add').style.display = 'none';
	if($('mood_message').value == ''){
		$('mood_message').value = '你可以更新状态, 让好友们知道你在做什么...';
	}
	$('mood_statusinput').style.zIndex = '1';
	$('mood_form').style.zIndex = '1';
}

function getStatusFace(i, faceul) {
	var faceli = document.createElement("li");
	faceli.innerHTML = '<img src="image/face/'+i+'.gif" style="cursor:pointer; position:relative;" />';
	faceli.getElementsByTagName('img').item(0).onclick = function(){var faceText = '[em:'+i+':]'; if($('mood_message') != null) { insertContent('mood_message', faceText); }};
	faceul.appendChild(faceli);
}

function reloadMood(showid, result) {
	var x = new Ajax();
	x.get('cp.php?ac=doing&op=getmood', function(s){
		$('mood_mystatus').innerHTML = s;
	});
	//提示获得积分
	showreward();
	hiddenstatus();
}