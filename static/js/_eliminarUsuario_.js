function generarContrasena() {
    const length = 14;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";

    while (true) {
        let hasUpperCase = false;
        let hasLowerCase = false;
        let hasDigit = false;
        let hasSpecialChar = false;
        password = "";

        for (let i = 0, n = charset.length; i < length; ++i) {
            const char = charset.charAt(Math.floor(Math.random() * n));
            password += char;

            if (/[A-Z]/.test(char)) hasUpperCase = true;
            if (/[a-z]/.test(char)) hasLowerCase = true;
            if (/\d/.test(char)) hasDigit = true;
            if (/[!@#$%^&*()_+~`|}{[\]:";?><,./-=]/.test(char)) hasSpecialChar = true;
        }

        if (hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar) break;
    }

    // Mostrar la contraseña generada en el input correspondiente
    document.getElementById("contraseñaGenerada").value = password;
}

function verificarContraseña() {
    const contraseñaInput = document.getElementById("contraseña");
    const contraseña = contraseñaInput.value;

    let tieneMayuscula = /[A-Z]/.test(contraseña);
    let tieneMinuscula = /[a-z]/.test(contraseña);
    let tieneDigito = /\d/.test(contraseña);
    let tieneEspecial = /[!@#$%^&*()_+~`|}{[\]:";?><,./-=]/.test(contraseña);

    if (tieneMayuscula && tieneMinuscula && tieneDigito && tieneEspecial) {
        // Contraseña válida: mostrar palomita verde y quitar advertencia roja
        contraseñaInput.classList.remove('is-invalid');
        contraseñaInput.classList.add('is-valid');
    } else {
        // Contraseña inválida: mostrar advertencia roja y quitar palomita verde
        contraseñaInput.classList.remove('is-valid');
        contraseñaInput.classList.add('is-invalid');
    }
}