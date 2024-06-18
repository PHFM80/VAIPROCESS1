document.addEventListener('DOMContentLoaded', function() {
    // JavaScript para cargar contenido dinámico desde el menú lateral
    document.querySelectorAll('aside a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let url = this.getAttribute('href');

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('main-content').innerHTML = html;
                    initializeUserGeneration(); // Llamar a la función de inicialización aquí
                    initializeEmailValidation(); // Llamar a la función de validación de email aquí
                })
                .catch(error => console.error('Error al cargar la página:', error));
        });
    });


    // Funcion para validar el documento que sean solo numeros


    // fin validar documento


    // funcion para generación de usuarios
    function initializeUserGeneration() {
        const btnGenerarUsuario = document.getElementById('btn-generar-usuario');
        const inputUsuario = document.getElementById('usuario');

        if (btnGenerarUsuario && inputUsuario) {
            btnGenerarUsuario.addEventListener('click', function() {
                const rolSeleccionado = document.getElementById('rol').value;
                const siguienteIdUsuario = document.querySelector('input[name="siguiente_id_usuario"]').value;

                inputUsuario.value = `${rolSeleccionado.toLowerCase()}0${siguienteIdUsuario}`;
            });
        } else {
            console.error('Elementos btn-generar-usuario o usuario no encontrados.');
        }
    } // fin funcion generacion usuario


    // Inicialización de la validación de correo electrónico
    function initializeEmailValidation() {
        const emailInput = document.getElementById('email');

        emailInput.addEventListener('input', function() {
            if (validarCorreo(emailInput.value)) {
                emailInput.classList.remove('is-invalid');
                emailInput.classList.add('is-valid');
            } else {
                emailInput.classList.remove('is-valid');
                emailInput.classList.add('is-invalid');
            }
        });
    } // fin inicializacion validar correo

    
    // Funciones de validación de correo
    // 1)
    function contarPuntosDominio(dominio) {
        return (dominio.match(/\./g) || []).length;
    }

    // 2)
    function separarYContarPartes(oracion) {
        let partes = oracion.split('.');
        let longitudes = partes.map(parte => parte.length);
        return [partes, longitudes];
    }

    // 3)
    function validarCorreo(correo) {
        if (correo.includes(' ')) {
            return false;
        }
        if (correo.split('@').length !== 2) {
            return false;
        }

        let [direccion, dominio] = correo.split('@');

        if (direccion.length < 5) {
            return false;
        }
        if (!/^[a-zA-Z]/.test(direccion)) {
            return false;
        }
        if (!/^[a-zA-Z0-9.]+$/.test(direccion)) {
            return false;
        }
        if (direccion.includes('..')) {
            return false;
        }
        if (dominio.startsWith('.') || dominio.endsWith('.')) {
            return false;
        }

        let puntosDominio = contarPuntosDominio(dominio);
        if (puntosDominio < 1 || puntosDominio > 2) {
            return false;
        }

        let [partes, longitudes] = separarYContarPartes(dominio);

        if (puntosDominio === 1) {
            if (longitudes[longitudes.length - 1] < 3) {
                return false;
            }
        } else if (puntosDominio === 2) {
            if (longitudes[longitudes.length - 2] < 3 || longitudes[longitudes.length - 1] < 2) {
                return false;
            }
        }

        return true;
    } //fin funciones validar correo


    // Función para generar contraseñas
    function generarContrasena() {
        const length = 15;
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

        document.getElementById('password').value = password;
    } // fin funcion generar contraseña


    // Función para mostrar/ocultar la contraseña
    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const showPassword = document.getElementById('show-password');
        if (showPassword.checked) {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    } //fin funcion mostrar contraseña


    // Funcion para Seleccioanr La region segun el pais.  (recibe como parametro )

 // Aca termina el DOM    
});
