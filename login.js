document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
    
    if ((username === 'Divan' || username === 'Tanika') && password === '20/12/2006') {
      // If username is 'Divan' or 'Tanika' and password is 'Divan', redirect to the next page
      window.location.href = 'home_page.html';
    } else {
      // If username or password is incorrect, display error message
      errorMessage.textContent = 'Incorrect username or password!';
    }
  });
  
  document.getElementById('show-password').addEventListener('change', function() {
    var passwordInput = document.getElementById('password');
    if (this.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
  