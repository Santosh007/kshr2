<!DOCTYPE html>
<html lang="en-US">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Catch-up</title>
<script type="text/javascript" src="scripts/jquery-3.0.0.js"></script>
<script type="text/javascript" src="scripts/myscript.js"></script>
<!-- <script type="text/javascript" src="script.js" async></script> -->
<link rel="stylesheet"
	href="//fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,700i,900,900i"
	type="text/css" media="all">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="css/emoji.css">
</head>

<body>
	<header class="masthead">
		<h1>Catch-up</h1>
	</header>
	<main class="main">
	<div class="intro">
		<input id="user-name" name="username" placeholder="User Name"></input>
		<button id="join" type="submit">Join</button>
		<button id="leave" type="submit">Leave</button>
	</div>
	<!-- .intro -->
	<section class="test-area">
		<!-- <div id="status">Connecting...</div> -->

		<ul id="origin-text"></ul>

		<div class="test-wrapper">
			<textarea id="test-area" name="textarea" rows="2"
				placeholder="Type message here."></textarea>
		</div>
		<!-- .test-wrapper -->

		<!-- <div id="origin-text">
                <p>The text to test.</p>
            </div>#origin-text -->

		<div class="meta">
			<!-- <section id="clock">
                    <div class="timer">00:00:00</div>
                </section> -->

			<button id="send" type="submit">Send</button>
		</div>
		<!-- .meta -->
	</section>
	<!-- .test-area -->
	<!-- <section class="emoji-area">
		<div class="emoji  emoji--like">
			<div class="emoji__hand">
				<div class="emoji__thumb"></div>
			</div>
		</div>
		<div class="emoji  emoji--love">
			<div class="emoji__heart"></div>
		</div>
		<div class="emoji  emoji--haha">
			<div class="emoji__face">
				<div class="emoji__eyes"></div>
				<div class="emoji__mouth">
					<div class="emoji__tongue"></div>
				</div>
			</div>
		</div>
		<div class="emoji  emoji--yay">
			<div class="emoji__face">
				<div class="emoji__eyebrows"></div>
				<div class="emoji__mouth"></div>
			</div>
		</div>
		<div class="emoji  emoji--wow">
			<div class="emoji__face">
				<div class="emoji__eyebrows"></div>
				<div class="emoji__eyes"></div>
				<div class="emoji__mouth"></div>
			</div>
		</div>
		<div class="emoji  emoji--sad">
			<div class="emoji__face">
				<div class="emoji__eyebrows"></div>
				<div class="emoji__eyes"></div>
				<div class="emoji__mouth"></div>
			</div>
		</div>
		<div class="emoji  emoji--angry">
			<div class="emoji__face">
				<div class="emoji__eyebrows"></div>
				<div class="emoji__eyes"></div>
				<div class="emoji__mouth"></div>
			</div>
		</div>
	</section> -->
	</main>
	<audio id="msgtone" src="isnt-it.mp3" preload="auto"></audio>
</body>

</html>

