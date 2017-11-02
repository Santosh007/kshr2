$(document).ready(function(){
	const testWrapper = $(".test-wrapper");
	const testArea = $("#test-area");
	const originText = $("#origin-text");
	const userName = $("#user-name");
	const sendButton = $("#send");
	const theTimer = $(".timer");
	const joinButton = $("#join");
	//const leaveButton = $("#leave");
	const subhead = $(".intro");
	const audio = $("#msgtone");
	const logo = $(".masthead");
	let url = "";
	var socket;
	var isConnected = false;
	var uname;
	var byUser = false;
	var replyhtml;
	
	var isSkytheme = false;
	var isRobotheme = false;
	
	var hst=  window.location.host;
	var pth= window.location.pathname;
	var proto = window.location.protocol;
	
	sendButton.css("display","none");
	joinButton.css("visibility","visible");
	//leaveButton.css("visibility","hidden");
	
	function join(){
		uname = userName.val();
		byUser = false;
		if(uname != ""){
			if(proto == 'https:'){
				url = 'wss://'+hst+pth+uname;
			}else{
				url = 'ws://'+hst+pth+uname;
			}
			socket = new WebSocket(url);
			socket.onopen = function(event) {
				subhead.css("background-color","#429890");
				joinButton.text("Leave");
				//joinButton.css("visibility","hidden");
				//leaveButton.css("visibility","visible");
				isConnected=true;
			};
			
			// on message:<div class="receivedtime"></div>
			socket.onmessage = function(event) {
				let message = event.data;
				let msgcontent;
				let obj = JSON.parse(message);
				if(obj.isemo){
					msgcontent = getEmoji(obj.content);//$('<div>').append($faces.find(obj.content).clone()).html();
				}else{
					msgcontent = obj.content;
				}
				if(obj.content!=null&&obj.content!=""){
				let liItem = $('<li class="received"></li>');
				if(obj.rcontent!=null&&obj.rcontent!=""){
					let rrmsgcontent = getEmoji(obj.rcontent);
					let rrec = $('<div class="receivedholder"><div><span>'+obj.rsender+'</span></div><div><span class="msgcontent">'+rrmsgcontent
							+ '</span><span class="receivedtime">'+obj.rreceived+'</span></div></div>').css({"background-color":"rgba(45, 179, 111, 0.35)","border-radius":"10px 10px 0px 0px"});
					liItem.append(rrec);
					let rmsgcontent = getEmoji(obj.content);
					let rec = $('<div class="receivedholder"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
							+ rmsgcontent +'</span><span class="receivedtime">'+obj.received+'</span></div></div>').css('border-radius','0px 0px 10px 10px');
					liItem.append(rec);
				}else{
					let html = '<div class="receivedholder"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
					+ msgcontent +'</span><span class="receivedtime">'+obj.received+'</span></div></div>';
					liItem.append(html);
				}
				/*let html = '<li><div class="received"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
				+ obj.content +'</span><span class="receivedtime">'+obj.received+'</span></div></div></li>';*/
				originText.append(liItem);
				let nodes = document.querySelectorAll('.received');
			    nodes[nodes.length-1].scrollIntoView();
			    if(document.hidden){ 
			    	audio[0].play();
			    }
			    originText.css('border-color',"#808080");
			}else{
				originText.css("border-color","#65CCF3");
				//originText.delay(2000).css('border-color',"#808080");
			}
			};
			
			socket.onclose = function(event) {
				console.log(JSON.stringify(event));
				subhead.css("background-color","grey");
				joinButton.text("Join");
				//joinButton.css("visibility","visible");
				//leaveButton.css("visibility","hidden");
				isConnected=false;
				if(!byUser){
					console.log("logged in again..!");
					join();
				}
			};
			
			// Handle any errors that occur.
			socket.onerror = function(error) {
				alert('WebSocket Error Server stopped contact santosh: ' + JSON.stringify(error));
				byUser= true;
			};
		}else {
			joinButton.text("Join");
			alert("Please enter user name");
		}	
	}
	
	function send(){
		if(isConnected){
			let textEnterd;
			let msgtext;
			if(arguments[0].isemo){
				textEnterd = getEmoji(arguments[0].emoji);//$('<div>').append($faces.find(arguments[0].emoji).clone()).html();
				msgtext = arguments[0].emoji;
			}else{
				textEnterd = testArea.val().trim();
				msgtext = textEnterd;
			}
			var msg = "";
			if(textEnterd != ""&&!arguments[0].typing){
				let liItem = $('<li class="sent"></li>');
				if(replyhtml !== undefined && replyhtml != ""){
					//replyhtml.removeClass('received').addClass('sentr');
					 let rsender = $(replyhtml.children()[0]).text();
					 let sec = $(replyhtml.children()[1]);
					 let rcontent;
					 if(isEmoji(sec)){
						 rcontent = getEmoId(sec);
					 }else{
						 rcontent = $(sec.children()[0]).text();  
					 }
					 let rreceived = $(sec.children()[1]).text();
					liItem.append(replyhtml.removeClass('received').removeClass('receivedholder').addClass('sentr'));
					let sent = $('<div class="holder"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
							+ '</span></div></div>').css('border-radius','0px 0px 10px 10px');
					liItem.append(sent);
					replyhtml = '';
					msg = '{"content":"' + msgtext + '", "sender":"' + uname + '", "received":"","rcontent":"'+rcontent+'","rsender":"'+rsender+'","rreceived":"'+rreceived+'","isemo":'+arguments[0].isemo+'}';
				}else{
					liItem.append('<div class="holder"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
							+ '</span></div></div>');
					msg = '{"content":"' + msgtext + '", "sender":"' + uname + '", "received":" ","rcontent":"","rsender":"","rreceived":"","isemo":'+arguments[0].isemo+'}';
				}
				socket.send(msg);
				/*let html = '<li><div class="sent"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
				+ '</span></div></div></li>';*/
				originText.append(liItem);
				testArea.val('');
				let nodes = document.querySelectorAll('.sent');
			    nodes[nodes.length-1].scrollIntoView();
			}else{
				//Check for typing
				msg = '{"content":"", "sender":"' + uname + '", "received":" ","rcontent":"","rsender":"","rreceived":"","isemo":'+arguments[0].isemo+'}';
				socket.send(msg);
				//console.log("Handle typing here");
			}
		}else{
			alert("Please join to send the messages");
		}
	}
	
	function enter(event){
		if (event.keyCode == 13){
			send({'typing':false,'isemo':false,'emoji':""});
		}else{
			send({'typing':true,'isemo':false,'emoji':""})
		}
	}
	
	function leave(){
		byUser = true;
		socket.close();
	}
	
	function joinleave(){
		  if(isConnected){
		    //isConnected = false;
		    joinButton.text("Join");
		    leave();
		  }else{
		    //isConnected = true;
		    joinButton.text("Leave");
		    join();
		  }
		}
	originText.on('click','li',function() {
		replyhtml = "";
		if($(this).css('background-color')=="rgb(173, 216, 230)"){
			$(this).css('background-color','rgba(0, 0, 0, 0)');
			replyhtml = "";
		}else{
			$(this).css('background-color','lightblue');
			replyhtml = $(this).children().clone();
		}
		
		
		//replytxt = $(this).text();
		
        //alert('Clicked list. ' + $(this).text());
	});
	
	/*function typing(){
		send();
	}*/
	/*function showhide(){
		$( ".sky" ).toggle();
		$( ".cloud" ).toggle();
		$( ".fcloud01" ).toggle();
		$( ".fcloud02" ).toggle();
	}*/
	//Message interpretter
	function getEmoId(){
		let emoid = $( arguments[0] ).find( ".emotion" )[0].id;
		//let emoid = arguments[0].id;
		return '#'+emoid;
	}
	
	function getEmoji(id){
		var element;
		if ($(id).length) {
			if($faces.has(id).length){
				element = $('<div>').append($faces.find(id).clone()).html();
			}
		}else{
			element  = id;
		}
		return element;
	}
	
	function isEmoji(elem){
		return $( elem ).has( ".emotion" ).length ? true : false;;
	}
	
	/**
	 * ------------------Emoticon logic---------------------
	 */
	$("#emobtn").on('click',showhide);

    function showhide(){
        $('.dialog').toggle();
    }
    
    $("#buddiesbtn").on('click',showbuddies);
    function showbuddies(){
    	$.getJSON( window.location+"api/buddies", function( json ) {
    		  //console.log( "JSON Data: " + json);
    		  $('#buddies_online .buddies_list li').remove();

    		  $.each(json, function(index,buddy) {
    			  console.log( "JSON Data: " + buddy.name);
    			let imgnum = Math.floor(Math.random() * 3) + 1;
    		    $('#buddies_online .buddies_list').append('<li><div class="grayface bkgrnd_img_'+imgnum+'"></div><div class="msgcontent">'+buddy.name+'</div></li>')
    		  });
    		  $('.buddies').toggle();
    		 });
      }
    
    $("#skytheme").on('click',applysky);
    
    function applysky(){
    	if(isRobotheme){
    		applyRobo();
    	}
    	if(isSkytheme){
    		$("#topmost").removeClass("sky");
    		$("#cloudy1").removeClass("cloud fcloud01");
    		$("#cloudy2").removeClass("cloud fcloud02");
    		isSkytheme = false;
    	}else{
    		$("#topmost").addClass( "sky" );
    		$("#cloudy1").addClass("cloud fcloud01");
    		$("#cloudy2").addClass("cloud fcloud02");
    		isSkytheme = true;
    	}
    }
    
    $('#robotheme').on('click',applyRobo);
    
    function applyRobo(){
    	if(isSkytheme){
    		applysky();
    	}
    	if(isRobotheme){
    		$("#topmost").removeClass("space");
    		$("#cloudy1").removeClass("wrapper");
    		$("#cloudy1 img:last-child").remove()
    		isRobotheme = false;
    	}else{
    		$("#topmost").addClass( "space" );
    		$("#cloudy1").addClass("wrapper");
    		$("#cloudy1").append('<img src="img/tall_robot.svg" width="150" alt="tall robot" class="robot" />');
    		isRobotheme = true;
    	}
    }
    
    var $faces = $('.faces');
    $faces.find('.emotion').on('click',sendemoticon);

    function sendemoticon(){
    	let emoji = "#"+this.id;
        send({'typing':false,'isemo':true,'emoji':emoji});
    }
    
    /*
     * let emoji = $('<div>').append($(this).clone()).html();
    	console.log(this.id);
    	$('<div>').append($faces.find(emoji).clone()).html()
    	var emoticon = $faces.find("#"+this.id)
//    	$faces.find("#"+this.id)
     * 
     */
    
   //----------------------Emoticon logic end-------------------- 
	
	sendButton.on("click",send);
	joinButton.on("click",joinleave);
	//leaveButton.on("click",leave);
	testArea.on("keydown",enter);
	//logo.on("click",showhide);
	//testArea.on("keyup",typing);
	
});