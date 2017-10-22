const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text");
const userName = document.querySelector("#user-name");
const socketStatus = document.querySelector("#status");
const sendButton = document.querySelector("#send");
const joinButton = document.querySelector("#join");
const leaveButton = document.querySelector("#leave");
const theTimer = document.querySelector(".timer");
const subhead = document.querySelector(".intro");

var socket;
var isConnected = false;
var uname;

var hst=  window.location.host;
var pth= window.location.pathname;

sendButton.style.display = 'none';
joinButton.style.visibility = 'visible';
leaveButton.style.visibility = 'hidden';
// Join the conversation
function join() {

	uname = userName.value;
	if (uname != "") {
		let url = 'ws://'+hst+pth+uname;
		socket = new WebSocket(url);
		
		socket.onopen = function(event) {
			subhead.style.backgroundColor = '#429890';
			joinButton.style.visibility = 'hidden';
			leaveButton.style.visibility = 'visible';
			isConnected = true;
			/*socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
			socketStatus.className = 'open';*/
		};

		// on message:
		socket.onmessage = function(event) {
			let message = event.data;
			let obj = JSON.parse(message);
			originText.innerHTML += '<li class="received"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
					+ obj.content +'</span></div><div class="receivedtime"><span>'+obj.received+'</span></div></li>';
			let nodes = document.querySelectorAll('.received');
		    nodes[nodes.length-1].scrollIntoView();
		};
		socket.onclose = function(event) {
			subhead.style.backgroundColor = 'grey';
			isConnected = false;
			joinButton.style.visibility = 'visible';
			leaveButton.style.visibility = 'hidden';
			/*socketStatus.innerHTML = 'Disconnected from WebSocket.';
			socketStatus.className = 'closed';*/
		};
		// Handle any errors that occur.
		socket.onerror = function(error) {
			alert('WebSocket Error: ' + error);
		};
		
	} else {
		alert("Please enter user name");
	}

}

/*// on message:
socket.onmessage = function(event) {
	var message = event.data;
	messagesList.innerHTML += '<li class="received"><span>Received:</span>'
			+ message + '</li>';
};*/

// send message:
function send() {
	if(isConnected){
	let textEnterd = testArea.value.trim();
	if(textEnterd != ""){
		var msg = '{"content":"' + textEnterd + '", "sender":"' + uname + '", "received":"' + '"}';
		socket.send(msg);
		originText.innerHTML += '<li class="sent"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
				+ '</span></div></li>';
		testArea.value = '';
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

// Close connection
function leave() {
	socket.close();
}

// Event listeners for keyboard input and the reset button:
sendButton.addEventListener("click", send, false);
joinButton.addEventListener("click", join, false);
leaveButton.addEventListener("click", leave, false);
testArea.addEventListener("keydown",enter,false);
//testArea.addEventListener("keyup",spellCheck,false);