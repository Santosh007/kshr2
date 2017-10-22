$(document).ready(function(){
	const testWrapper = $(".test-wrapper");
	const testArea = $("#test-area");
	const originText = $("#origin-text");
	const userName = $("#user-name");
	const sendButton = $("#send");
	const theTimer = $(".timer");
	const joinButton = $("#join");
	const leaveButton = $("#leave");
	const subhead = $(".intro");
	const audio = $("#msgtone");
	
	var socket;
	var isConnected = false;
	var uname;
	var byUser = false;
	var replyhtml;
	
	var hst=  window.location.host;
	var pth= window.location.pathname;
	var proto = window.location.protocol;
	
	sendButton.css("display","none");
	joinButton.css("visibility","visible");
	leaveButton.css("visibility","hidden");
	
	function join(){
		uname = userName.val();
		byUser = false;
		if(uname != ""){
			let url = "";
			if(proto == 'https:'){
				url = 'wss://'+hst+pth+uname;
			}else{
				url = 'ws://'+hst+pth+uname;
			}
			socket = new WebSocket(url);
			socket.onopen = function(event) {
				subhead.css("background-color","#429890");
				joinButton.css("visibility","hidden");
				leaveButton.css("visibility","visible");
				isConnected=true;
			};
			
			// on message:<div class="receivedtime"></div>
			socket.onmessage = function(event) {
				let message = event.data;
				let obj = JSON.parse(message);
				let liItem = $('<li class="received"></li>');
				if(obj.rcontent!=null&&obj.rcontent!=""){
					let rrec = $('<div class="receivedholder"><div><span>'+obj.rsender+'</span></div><div><span class="msgcontent">'+obj.rcontent
							+ '</span><span class="receivedtime">'+obj.rreceived+'</span></div></div>').css({"background-color":"rgba(45, 179, 111, 0.35)","border-radius":"10px 10px 0px 0px"});
					liItem.append(rrec);
					let rec = $('<div class="receivedholder"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
							+ obj.content +'</span><span class="receivedtime">'+obj.received+'</span></div></div>').css('border-radius','0px 0px 10px 10px');
					liItem.append(rec);
				}else{
					let html = '<div class="receivedholder"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
					+ obj.content +'</span><span class="receivedtime">'+obj.received+'</span></div></div>';
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
			};
			
			socket.onclose = function(event) {
				console.log(JSON.stringify(event));
				subhead.css("background-color","grey");
				joinButton.css("visibility","visible");
				leaveButton.css("visibility","hidden");
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
			alert("Please enter user name");
		}	
	}
	
	function send(){
		if(isConnected){
			let textEnterd = testArea.val().trim();
			if(textEnterd != ""){
				var msg = "";
				let liItem = $('<li class="sent"></li>');
				if(replyhtml !== undefined && replyhtml != ""){
					//replyhtml.removeClass('received').addClass('sentr');
					 let rsender = $(replyhtml.children()[0]).text();
					 let sec = $(replyhtml.children()[1]);
					 let rcontent = $(sec.children()[0]).text();
					 let rreceived = $(sec.children()[1]).text();
					liItem.append(replyhtml.removeClass('received').removeClass('receivedholder').addClass('sentr'));
					let sent = $('<div class="holder"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
							+ '</span></div></div>').css('border-radius','0px 0px 10px 10px');
					liItem.append(sent);
					replyhtml = '';
					msg = '{"content":"' + textEnterd + '", "sender":"' + uname + '", "received":"","rcontent":"'+rcontent+'","rsender":"'+rsender+'","rreceived":"'+rreceived+'"}';
				}else{
					liItem.append('<div class="holder"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
							+ '</span></div></div>');
					msg = '{"content":"' + textEnterd + '", "sender":"' + uname + '", "received":" ","rcontent":"","rsender":"","rreceived":""}';
				}
				socket.send(msg);
				/*let html = '<li><div class="sent"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
				+ '</span></div></div></li>';*/
				originText.append(liItem);
				testArea.val('');
				let nodes = document.querySelectorAll('.sent');
			    nodes[nodes.length-1].scrollIntoView();
			}
		}else{
			alert("Please join to send the messages");
		}
	}
	
	function enter(event){
		if (event.keyCode == 13){
			send();
		}
	}
	
	function leave(){
		byUser = true;
		socket.close();
	}
	
	originText.on('click','li',function() {
		replyhtml = "";
		$(this).css('background-color','lightblue');
		//replytxt = $(this).text();
		replyhtml = $(this).children().clone();
        //alert('Clicked list. ' + $(this).text());
	});
	
	sendButton.on("click",send);
	joinButton.on("click",join);
	leaveButton.on("click",leave);
	testArea.on("keydown",enter);
	
});