// Function to display error messages
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Show the error message
    }
}

// Function to clear error messages
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none'; // Hide the error message
    }
}

// Function to validate password
function validatePassword(password) {
    const errors = [];

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push("at least one lowercase letter");
    }
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push("at least one uppercase letter");
    }
    // Check for at least one number
    if (!/[0-9]/.test(password)) {
        errors.push("at least one number");
    }
    // Check for at least one special character or symbol
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
        errors.push("at least one special character/symbol");
    }
    // Check for length between 6 and 8 characters
    if (password.length < 6 ) {
        errors.push("length must be at least 6 character long");
    }

    if (errors.length > 0) {
        return "Password must contain: " + errors.join(", ") + ".";
    }
    return ""; // No errors
}

// Validate the Login Form
function validateLoginForm() {
    let isValid = true;

    // Get input elements
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');

    // Clear previous errors
    clearError('loginUsernameError');
    clearError('loginPasswordError');

    // Validate Username
    if (usernameInput.value.trim() === '') {
        displayError('loginUsernameError', 'Username is required.');
        isValid = false;
    }

    // Validate Password
    const passwordError = validatePassword(passwordInput.value);
    if (passwordInput.value.trim() === '') {
        displayError('loginPasswordError', 'Password is required.');
        isValid = false;
    } else if (passwordError) {
        displayError('loginPasswordError', passwordError);
        isValid = false;
    }

    return isValid; // Prevent form submission if not valid
}
// Function to show the Forgot Password form
function showForgotPasswordForm() {
    document.querySelector(".login-form-container").style.display = "none";
    document.querySelector(".forgot-password-form-container").style.display = "block";
    // Optionally change background gradient here if desired, similar to original signup/login functions
    // document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(149, 56, 189), rgb(106, 28, 139));";
}

// Function to show the Login form (used for "Back to Login" link)
function showLoginForm() {
    document.querySelector(".forgot-password-form-container").style.display = "none";
    document.querySelector(".login-form-container").style.display = "block";
    // Reset background to original login gradient if it was changed
    // document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 100), rgb(20, 97, 55, 0.765));";
}

// Validate the Forgot Password Form
function validateForgotPasswordForm() {
    let isValid = true;

    // Get input elements
    const emailInput = document.getElementById('forgotEmail');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Clear previous errors
    clearError('forgotEmailError');
    clearError('newPasswordError');
    clearError('confirmPasswordError');

    // Validate Email (using the same regex as for signup email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        displayError('forgotEmailError', 'Email is required.');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        displayError('forgotEmailError', 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate New Password (using the existing validatePassword function)
    const newPasswordError = validatePassword(newPasswordInput.value);
    if (newPasswordInput.value.trim() === '') {
        displayError('newPasswordError', 'New Password is required.');
        isValid = false;
    } else if (newPasswordError) {
        displayError('newPasswordError', newPasswordError);
        isValid = false;
    }

    // Validate Confirm Password and compare with New Password
    if (confirmPasswordInput.value.trim() === '') {
        displayError('confirmPasswordError', 'Confirm Password is required.');
        isValid = false;
    } else if (newPasswordInput.value !== confirmPasswordInput.value) {
        displayError('confirmPasswordError', 'Passwords do not match.');
        isValid = false;
    }

    if (isValid) {
        // If all validations pass, you can add logic here to submit the password reset request
        // For now, we'll just redirect back to the login form
        alert("Password reset request submitted successfully! (This is a dummy message)."); // Replaced alert with a dummy message as per instructions
        showLoginForm(); // Redirect back to login form
    }

    return isValid; // Prevent form submission if not valid
}
