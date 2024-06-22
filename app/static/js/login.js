
function contarPuntosDominio(dominio) {
    return (dominio.match(/\./g) || []).length;
}

function separarYContarPartes(oracion) {
    // Separar la oración en partes usando el punto como delimitador
    let partes = oracion.split('.');
    
    // Contar los caracteres de cada parte
    let longitudes = partes.map(parte => parte.length);
    
    return [partes, longitudes];
}

function validarCorreo(correo) {
    // Verificar si el correo contiene espacios en blanco
    if (correo.includes(' ')) {
        return false;
    }

    // Verificar si contiene exactamente un arroba
    if (correo.split('@').length !== 2) {
        return false;
    }
    
    // Separar la dirección del dominio
    let [direccion, dominio] = correo.split('@');

    // Verificar longitud mínima de la dirección
    if (direccion.length < 5) {
        return false;
    }
    
    // Verificar que la dirección comience con una letra
    if (!/^[a-zA-Z]/.test(direccion)) {
        return false;
    }
    
    // Verificar caracteres permitidos en la dirección
    if (!/^[a-zA-Z0-9.]+$/.test(direccion)) {
        return false;
    }
    
    // Verificar que no haya ".." en la dirección
    if (direccion.includes('..')) {
        return false;
    }

    // Verificar que el dominio no empiece ni termine con un punto
    if (dominio.startsWith('.') || dominio.endsWith('.')) {
        return false;
    }

    // Verificar la cantidad de puntos en el dominio (uno o dos)
    let puntosDominio = contarPuntosDominio(dominio);
    if (puntosDominio < 1 || puntosDominio > 2) {
        return false;
    }

    let [partes, longitudes] = separarYContarPartes(dominio);

    // Verificar que si hay un punto, la parte después del punto tenga al menos tres caracteres
    if (puntosDominio === 1) {
        if (longitudes[longitudes.length - 1] < 3) {
            return false;
        }
    } 
    // Verificar que si hay dos puntos, la primer parte tenga al menos tres caracteres después del punto 
    // y la segunda parte tenga al menos dos caracteres después del punto
    else if (puntosDominio === 2) {
        if (longitudes[longitudes.length - 2] < 3 || longitudes[longitudes.length - 1] < 2) {
            return false;
        }
    }

    return true;
}

//validacion de datos ingresados en el login, para no mandar datos erroneos al servidor

document.addEventListener("DOMContentLoaded", function() {
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("submitButton");

    const emailError = document.getElementById("emailError");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    const usernameRegex = /^(uso0[1-4]0)\d{1,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{15,}$/;

    function validateEmail() {
        if (validarCorreo(emailInput.value)) {
            emailError.style.display = "none";
            return true;
        } else {
            emailError.style.display = "block";
            return false;
        }
    }

    function validateUsername() {
        if (usernameRegex.test(usernameInput.value)) {
            usernameError.style.display = "none";
            return true;
        } else {
            usernameError.style.display = "block";
            return false;
        }
    }

    function validatePassword() {
        if (passwordRegex.test(passwordInput.value)) {
            passwordError.style.display = "none";
            return true;
        } else {
            passwordError.style.display = "block";
            return false;
        }
    }

    function validateForm() {
        const isEmailValid = validateEmail();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        submitButton.disabled = !(isEmailValid && isUsernameValid && isPasswordValid);
    }

    emailInput.addEventListener("input", validateForm);
    usernameInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
});

document.getElementById('togglePassword').addEventListener('click', function (event) {
    event.preventDefault(); // Evita que el botón del "ojito" envíe el formulario
    const passwordField = document.getElementById('password');
    const passwordFieldType = passwordField.getAttribute('type');
    if (passwordFieldType === 'password') {
      passwordField.setAttribute('type', 'text');
      this.textContent = '👁️'; // Cambia el icono al de ojos cerrados
    } else {
      passwordField.setAttribute('type', 'password');
      this.textContent = '🙈'; // Cambia el icono al de ojos abiertos
    }
});
