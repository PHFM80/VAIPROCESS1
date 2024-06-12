
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('aside a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let url = this.getAttribute('href');

            fetch(url)
                .then(response => response.text())
                .then(html => {
                    document.getElementById('main-content').innerHTML = html;
                })
                .catch(error => console.error('Error al cargar la página:', error));
        });
    });
});


// validaciones  de los datoa para cargar un usuario nuevo

document.addEventListener('DOMContentLoaded', function() {
    // Validación de campos obligatorios
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            const errorMsg = document.getElementById(`${this.id}-error`);
            if (this.value.trim() === '') {
                errorMsg.style.display = 'inline';
            } else {
                errorMsg.style.display = 'none';
            }
        });
    });

    // Validación del email
    const emailField = document.getElementById('email');
    emailField.addEventListener('input', function() {
        const emailFormatMsg = document.querySelector('.email-format-msg');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(this.value)) {
            emailFormatMsg.style.display = 'none';
        } else {
            emailFormatMsg.style.display = 'block';
        }
    });

    // Generación de contraseñas
    document.getElementById('generate-password').addEventListener('click', function() {
        const passwordField = document.getElementById('password');
        const generatedPassword = Math.random().toString(36).slice(-8);
        passwordField.value = generatedPassword;
    });

    // Carga dinámica de regiones y comunas
    document.getElementById('pais').addEventListener('change', function() {
        const paisId = this.value;
        fetch(`/get_regiones/${paisId}`)
            .then(response => response.json())
            .then(data => {
                const regionSelect = document.getElementById('region');
                regionSelect.innerHTML = data.map(region => `<option value="${region.id}">${region.nombre}</option>`).join('');
                regionSelect.dispatchEvent(new Event('change'));
            });
    });

    document.getElementById('region').addEventListener('change', function() {
        const regionId = this.value;
        fetch(`/get_comunas/${regionId}`)
            .then(response => response.json())
            .then(data => {
                const comunaSelect = document.getElementById('comuna');
                comunaSelect.innerHTML = data.map(comuna => `<option value="${comuna.id}">${comuna.nombre}</option>`).join('');
            });
    });

    // Inicialización del select
    document.getElementById('pais').dispatchEvent(new Event('change'));
});
