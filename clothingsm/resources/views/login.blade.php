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
		<form action="/register" method="POST">
			@csrf 
			<h1>Create Account</h1>
            <input name="username" type="text" placeholder="Username"/>
			<input name="name" type="text" placeholder= "Name" />
			<input name="email" type="email" placeholder="Email" />
            <input name="mobilenum" type="text" placeholder="Mobile Number">
			<input name="password" type="password" placeholder="Password" />
            <input name="confirmpass" type="password" placeholder="Comfirm Password" />
            <div class="termsandcondition"><input type="checkbox"><div class="words"><span>I accept</span> <a href="">Terms and Condition</a></div></div>
			<button>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<input type="text" placeholder="Username" id="username" />
			<input type="password" placeholder="Password" id="password" />
			<a href="#">Forgot your password?</a>
			<button onclick="login()">Sign In</button>
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