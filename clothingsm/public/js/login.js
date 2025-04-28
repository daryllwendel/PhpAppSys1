

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
}); 

    const loginForm = document.querySelector('.sign-in-container form');
    const msg = document.getElementById('loginMsg');

    loginForm.addEventListener('submit', async e => {
        e.preventDefault();  

        msg.className = 'msg';
        msg.textContent = 'Checking…';

        const loginname = loginForm.loginname.value;
        const loginpassword = loginForm.loginpassword.value;

        if (!loginname) {
            msg.classList.add('error');
            msg.textContent = 'The username is required';
            return;
        }

        if (!loginpassword) {
            msg.classList.add('error');
            msg.textContent = 'The password is required';
            return;
        }

        const payload = new URLSearchParams({
            loginname: loginForm.loginname.value,
            loginpassword: loginForm.loginpassword.value,
            _token: loginForm._token.value, 
        });

        const ajaxURL = '/ajax/login';  
    
        try {
            const r = await fetch(ajaxURL, {
                method: 'POST',  
                headers: { 'Accept': 'application/json' },
                body: payload
            });

            const data = await r.json();

            if (r.ok && data.ok) {
                msg.classList.add('ok');
                msg.textContent = 'Welcome!';
                if(data.role =='admin'){
                    window.location ='/dashboard'
                }else{
                    window.location = '/CustomerDashboard';
                }
            } else {
                msg.classList.add('error');
                msg.textContent = data.message || 'Login failed';
            }

        } catch (err) {
            msg.classList.add('error');
            msg.textContent = 'Server error – please try again.';
            console.error(err);
        }
    });

function toggleButton(){
    const checkbox = document.getElementById('toggleCheckbox')
    const button = document.getElementById('myButton')
    button.disabled= !checkbox.checked
}

function showmsg(){
    alert('Account Created!')
}


