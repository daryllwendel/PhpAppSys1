<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{asset("css/login.css")}}">
</head>
<body>
<div class="container" id="container">

	<div class="form-container sign-up-container" class="sign-up-content">
		<form action="/register" method="POST" id="registerForm">
			@csrf
			<h1>Create Account</h1>
            <input id="registerUsername" name="username" type="text" placeholder="Username"/>
			<input id="name" name="name" type="text" placeholder= "Name ex. Juan Dela Cruz" />
			<input id="email" name="email" type="email" placeholder="Email ex. juanDelaCruz@email.com" />
            <input id="mobile_number" name="mobile_number" type="tel" pattern="[0-9]{11}" placeholder="Mobile Number ex.09123456789" maxlength="11">
			<input id="registerPassword" name="password" type="password" placeholder="Password (Must exceed 8 characters)" />
            <div class="termsandcondition"><input type="checkbox" id="toggleCheckbox" onchange="toggleButton()"><div class="words"><span>I accept</span> <a href="">Terms and Condition</a></div></div>
			<button id="myButton" disabled>Sign Up</button>
		</form>
	</div>

	<div class="form-container sign-in-container">
		<form method="POST" action="/login">
			@csrf
			<h1>Sign in</h1>
			<input name="loginname" type="text" placeholder="Username or Email" id="username" />
			<input name="loginpassword" type="password" placeholder="Password" id="password" />
			<a href="#">Forgot your password?</a>
			<p id="loginMsg" class="msg"></p>
			<button>Sign In</button>
		</form>
	</div>

	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>
<script src="{{asset("js/login.js")}}"></script>
</body>
</html>
