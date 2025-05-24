const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Facebook-style error handling
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + '-error');
    const inputGroup = input?.parentElement;

    if (input && errorDiv && inputGroup) {
        input.classList.add('error');
        inputGroup.classList.add('has-error');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + '-error');
    const inputGroup = input?.parentElement;

    if (input && errorDiv && inputGroup) {
        input.classList.remove('error');
        inputGroup.classList.remove('has-error');
        errorDiv.classList.remove('show');
    }
}

function clearAllErrors() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        if (input.id) clearError(input.id);
    });
}

// Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateMobile(mobile) {
    const cleaned = mobile.replace(/\s|-/g, '');
    return /^09\d{9}$/.test(cleaned) || /^\+639\d{9}$/.test(cleaned);
}

// Login
const loginForm = document.querySelector('.sign-in-container form');
const msg = document.getElementById('loginMsg');

if (loginForm && msg) {
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();

        clearAllErrors();
        msg.className = 'msg';
        msg.textContent = '';

        const loginname = loginForm.loginname.value.trim();
        const loginpassword = loginForm.loginpassword.value;

        let hasErrors = false;

        if (!loginname) {
            showError('login-username', 'Username or email is required');
            hasErrors = true;
        }
        if (!loginpassword) {
            showError('login-password', 'Password is required');
            hasErrors = true;
        }

        if (hasErrors) return;

        msg.className = 'msg show';
        msg.textContent = 'Checking…';

        const payload = new URLSearchParams({
            loginname,
            loginpassword,
            _token: loginForm._token.value,
        });

        try {
            const r = await fetch('/ajax/login', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: payload
            });
            const data = await r.json();

            if (r.ok && data.ok) {
                msg.classList.add('ok');
                msg.textContent = 'Welcome!';
                window.location = data.role === 'admin' ? '/dashboard' : '/CustomerDashboard';
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
}

// Registration
document.querySelectorAll(".register").forEach(form => {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        clearAllErrors();

        const username = form.username.value.trim();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const rawMobile = form.mobile_number.value.trim();
        const password = form.password.value;

        let hasErrors = false;

        if (!username || username.length < 3) {
            showError('reg-username', 'Username must be at least 4 characters');
            hasErrors = true;
        }

        if (!name || name.length < 2) {
            showError('reg-name', 'Please enter your full name');
            hasErrors = true;
        }

        if (!email || !validateEmail(email)) {
            showError('reg-email', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!rawMobile || !validateMobile(rawMobile)) {
            showError('reg-mobile', 'Please enter a valid mobile number');
            hasErrors = true;
        }

        if (!password || password.length < 6) {
            showError('reg-password', 'Password must be at least 8 characters');
            hasErrors = true;
        }

        if (hasErrors) return;

        // Convert 09XXXXXXXXX to +639XXXXXXXXX
        let formattedMobile = rawMobile;
        if (rawMobile.startsWith('09')) {
            formattedMobile = '+63' + rawMobile.slice(1);
        }
        form.mobile_number.value = formattedMobile;

        const formData = new FormData(form);
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";

        fetch("/register", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: formData,
        })
          .then(async res => {
    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        const text = await res.text(); 
        throw new Error("Unexpected response from server. Not JSON.");
    }

    const data = await res.json();

    if (res.ok && data.ok) {
        alert("Account Created Successfully!");
        form.reset();
        document.getElementById('myButton').disabled = true;
        container.classList.remove("right-panel-active");
    } else if (data.errors) {
        Object.keys(data.errors).forEach(field => {
            const inputId = 'reg-' + field;
            showError(inputId, data.errors[field][0]);
        });
    } else {
        throw new Error(data.message || "Registration failed");
    }
})
        .then(data => {
            // <-- at this point, `data` is undefined!
            if (data.ok) {
                alert("Account Created Successfully!");
                form.reset();
                document.getElementById('myButton').disabled = true;
                container.classList.remove("right-panel-active");
            } else if (data.errors) {
                Object.keys(data.errors).forEach(field => {
                    const inputId = 'reg-' + field;
                    showError(inputId, data.errors[field][0]);
                });
            }
        })

            });
        });

// Real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) clearError(input.id);
        });
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            if (value && input.classList.contains('error')) clearError(input.id);
        });
    });

    // Optional: filter invalid characters in mobile field
    const mobileInput = document.getElementById('reg-mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', e => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });
    }
});

// Terms checkbox toggle
function toggleButton() {
    const checkbox = document.getElementById('toggleCheckbox');
    const button = document.getElementById('myButton');
    if (checkbox && button) {
        button.disabled = !checkbox.checked;
    }
}

function showmsg() {
    alert('Account Created!');
}
