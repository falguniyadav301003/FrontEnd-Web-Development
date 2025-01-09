let passwordInput = document.getElementById('password');
let passwordStrengths = document.querySelectorAll('.password-strength');
let strengthMessage = document.getElementById('strength-message');
let feedbackList = document.getElementById('feedback-list');

passwordInput.addEventListener('input', function (event) {
    let password = event.target.value;
    let strength = "Weak";
    let color = "#ff2c1c";
    let feedback = []; 
    if (password.length >= 8) {
        let hasUpper = /[A-Z]/.test(password);
        let hasLower = /[a-z]/.test(password);
        let hasNumber = /\d/.test(password);
        let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if ((hasUpper && hasLower && (hasNumber || hasSpecial)) && password.length >= 8) {
            strength = "Strong";
            color = "#12ff12";
        } else if (hasUpper || hasLower || hasNumber || hasSpecial) {
            strength = "Medium";
            color = "#ff9800";
        }
        if (!hasUpper) feedback.push("Include at least one uppercase letter.");
        if (!hasLower) feedback.push("Include at least one lowercase letter.");
        if (!hasNumber) feedback.push("Include at least one numeric digit.");
        if (!hasSpecial) feedback.push("Include at least one special character.");
    } else {
        feedback.push("Password must be at least 8 characters long.");
    }
    passwordStrengths.forEach(passwordStrength => {
        passwordStrength.style.border = `3px solid ${color}`;
    });
    strengthMessage.textContent = `Password strength: ${strength}`;
    strengthMessage.style.color = color;
    feedbackList.innerHTML = ""; 
    feedback.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        feedbackList.appendChild(li);
    });
});
