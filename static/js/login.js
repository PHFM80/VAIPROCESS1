// Función para contar los puntos en un dominio
function contarPuntosDominio(dominio) {
    return (dominio.match(/\./g) || []).length;
}
// Función para separar un dominio en partes y contar las longitudes de las partes
function separarYContarPartes(dominio) {
    let partes = dominio.split('.');
    let longitudes = partes.map(parte => parte.length);
    return [partes, longitudes];
}
// Función para validar un correo electrónico
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
    // Elementos del formulario y mensajes de error
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("submitButton");

    const emailError = document.getElementById("emailError");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    // Expresión regular para validar el nombre de usuario
    const usernameRegex = /^(uso0[1-4]0)\d{1,4}$/;

    // Función para validar el correo electrónico
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailValue = emailInput.value.trim();

        // Verificar campo vacío
        if (emailValue === '') {
            emailError.style.display = "none"; // Ocultar mensaje de advertencia
            emailInput.classList.remove('is-invalid');
            emailInput.classList.remove('is-valid');
            return false; // El campo vacío no es válido
        }

        // Validar el formato del correo solo si no está vacío
        const isValid = validarCorreo(emailValue);

        if (isValid) {
            emailError.style.display = "none"; // Ocultar mensaje de error
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        } else {
            emailError.style.display = "block"; // Mostrar mensaje de error
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        }

        return isValid;
    }

    // Función para validar el nombre de usuario
    function validateUsername() {
        const usernameInput = document.getElementById('username');
        const usernameError = document.getElementById('usernameError');
        const usernameValue = usernameInput.value.trim(); // Obtener valor del campo y quitar espacios en blanco al inicio y final
        const isValid = usernameRegex.test(usernameValue);

        if (usernameValue === '') {
            // Campo vacío: no mostrar ningún mensaje ni clase de validación
            usernameError.style.display = "none";
            usernameInput.classList.remove('is-invalid', 'is-valid');
            return false; // Retorna falso porque el campo está vacío
        } else if (isValid) {
            // Usuario válido: mostrar palomita verde y quitar advertencia roja
            usernameError.style.display = "none"; // Ocultar mensaje de error
            usernameInput.classList.remove('is-invalid');
            usernameInput.classList.add('is-valid');
            return true; // Retorna verdadero porque el usuario es válido
        } else {
            // Usuario inválido: mostrar mensaje de error y quitar palomita verde
            usernameError.style.display = "block"; // Mostrar mensaje de error
            usernameInput.classList.remove('is-valid');
            usernameInput.classList.add('is-invalid');
            return false; // Retorna falso porque el usuario es inválido
        }
    }
    // Función para validar la contraseña
    function verificarContraseña() {
        const contraseñaInput = document.getElementById("password");
        const contraseña = contraseñaInput.value.trim();

        if (contraseña === '') {
            passwordError.style.display = "none"; // Ocultar mensaje de advertencia
            contraseñaInput.classList.remove('is-invalid');
            contraseñaInput.classList.remove('is-valid');
            return false; // El campo vacío no es válido
        }

        let tieneMayuscula = /[A-Z]/.test(contraseña);
        let tieneMinuscula = /[a-z]/.test(contraseña);
        let tieneDigito = /\d/.test(contraseña);
        let tieneEspecial = /[!@#$%^&*()_+~`|}{[\]:";?><,./-=]/.test(contraseña);

        const isValid = tieneMayuscula && tieneMinuscula && tieneDigito && tieneEspecial;

        if (isValid) {
            // Contraseña válida: mostrar palomita verde y quitar advertencia roja
            contraseñaInput.classList.remove('is-invalid');
            contraseñaInput.classList.add('is-valid');
            passwordError.style.display = "none"; // Ocultar mensaje de advertencia
        } else {
            // Contraseña inválida: mostrar advertencia roja y quitar palomita verde
            contraseñaInput.classList.remove('is-valid');
            contraseñaInput.classList.add('is-invalid');
            passwordError.style.display = "block"; // Mostrar mensaje de advertencia
        }

        return isValid;
    }


    // Función para validar el formulario completo
    function validateForm() {
        const isEmailValid = validateEmail();
        const isUsernameValid = validateUsername();
        const isPasswordValid = verificarContraseña();
        submitButton.disabled = !(isEmailValid && isUsernameValid && isPasswordValid);
    }

    // Agregar listeners de eventos para validar el formulario en cada cambio

    emailInput.addEventListener("input", validateForm);
    usernameInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm); // Puedes mantener este listener o eliminarlo si ya no se utiliza.

   
    



});

// Evento para alternar entre mostrar/ocultar la contraseña
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
