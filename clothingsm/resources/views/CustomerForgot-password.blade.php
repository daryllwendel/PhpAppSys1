<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="{{ asset('css/CustomerForgot-password.css') }}">
  <link rel="stylesheet" href="{{ asset('css/loading.css')}}">
  <title>Reset Password via OTP</title>
  <style>.hidden { display: none; }</style>
</head>
<body>
<div class="container" id="container">

  <!-- Form Section -->
  <div class="form-container forgot-password-container">
    <form>
      <h1>Reset Password</h1>

      <!-- Step 1: Enter Email -->
      <div id="email-section" class="section">
       <input type="email" id="email" name="email" placeholder="Enter your email" required>
        <button type="button" onclick="sendOtp()">Send OTP</button>
        <div id="email-msg" class="msg"></div>
      </div>

      <!-- Step 2: Enter OTP and New Password -->
      <div id="otp-section" class="section hidden">
        <input type="text" id="otp" placeholder="Enter OTP" required>
        <input type="password" id="new-password" placeholder="New Password" name="password" required>
        <input type="password" id="confirm-password" placeholder="Re-enter New Password" required>
        <button type="button" onclick="verifyOtp()">Reset Password</button>
        <div id="otp-msg" class="msg"></div>
      </div>

      <!-- Login Link -->
      <a href="/login">Remember your password? Log in</a>
    </form>
  </div>

  <!-- Right Panel / Overlay -->
  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-right">
        <h1 id="overlay-title">Forgot Password?</h1>
        <p id="overlay-description">Don't worry! Enter your email and we'll send you a code to reset your password.</p>
      </div>
    </div>
  </div>

</div>

<script>
  function loadloading(){
    fetch('/loading')
    .then(res => res.text())
    .then((html)=>{
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const loading = doc.querySelector('.loader-wrapper')
        if(loading){
           const content =document.getElementById('container')
            content.innerHTML=''
            content.appendChild(loading)
        }else{
            console.log('error loading')
        }
    }).catch((err) => console.error("Failed to load dashboard content:", err))
}
function clearLoading() {
    const body = document.getElementById('container');
    const loader = body.querySelector('.loader-wrapper');
    if (loader) {
        loader.remove();
    }
}
  document.addEventListener('DOMContentLoaded', () => {
    
 async function sendOtp() {
  const email = document.getElementById('email').value;
  const msgDiv = document.getElementById('email-msg');

  try {
    const res = await fetch('http://127.0.0.1:8000/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      msgDiv.textContent = data.message;
      msgDiv.style.color = 'green';
      document.getElementById('email-section').classList.add('hidden');
      document.getElementById('otp-section').classList.remove('hidden');
    } else {
      // Show error message
      msgDiv.textContent = data.message || 'Something went wrong.';
      msgDiv.style.color = 'red';

      // Optional specific check for invalid email
      if (res.status === 404 && data.message.includes('Email not found')) {
        alert('The email you entered does not exist in our records.');
      } else {
        alert(data.message || 'Failed to send OTP. Please try again.');
      }
    }
  } catch (error) {
    msgDiv.textContent = 'Error: ' + error.message;
    msgDiv.style.color = 'red';
    alert('A network error occurred. Please try again.');
  }
}


    async function verifyOtp() {
      loadloading()
      const email = document.getElementById('email').value;
      const otp = document.getElementById('otp').value;
      const password = document.getElementById('new-password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const msgDiv = document.getElementById('otp-msg');

      if (password !== confirmPassword) {
        msgDiv.textContent = 'Passwords do not match.';
        msgDiv.style.color = 'red';
        return;
      }

      try {
        const otpRes = await fetch('http://127.0.0.1:8000/api/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, otp })
        });

        const otpData = await otpRes.json();
        if (!otpRes.ok) {
          msgDiv.textContent = otpData.message || 'Invalid OTP';
          msgDiv.style.color = 'red';
          return;
        }

        const resetRes = await fetch('http://127.0.0.1:8000/api/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const resetData = await resetRes.json();
        msgDiv.textContent = resetData.message;
        msgDiv.style.color = resetRes.ok ? 'green' : 'red';
        alert('Change password successfull')
        clearLoading()
        setTimeout(() => window.location.href = '/login', 1000);
      } catch (error) {
        msgDiv.textContent = 'Error: ' + error.message;
        msgDiv.style.color = 'red';
      }
    }

    // Expose functions to global scope
    window.sendOtp = sendOtp;
    window.verifyOtp = verifyOtp;

  });
</script>


</body>
</html>
