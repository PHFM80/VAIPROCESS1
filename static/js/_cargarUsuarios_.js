
// 1) Función para llenar el select con los tipos de documento// Función para llenar el select con los tipos de documento
function llenarSelectTiposDocumento() {
    var select = document.getElementById('tipoDocumento');
    var hiddenInput = document.getElementById('idTipoDocumento');

    // Iterar sobre tiposDocumento y agregar opciones al select
    tiposDocumento.forEach(function(tipo) {
        var option = document.createElement('option');
        option.value = tipo[0]; // ID del tipo de documento
        option.textContent = tipo[1]; // Nombre del tipo de documento
        select.appendChild(option);
    });

    // Agregar evento para actualizar el input hidden al seleccionar una opción
    select.addEventListener('change', function() {
        hiddenInput.value = this.value; // Asignar el valor seleccionado al input hidden
    });
}
// Llamar a la función para llenar el select una vez que los datos estén disponibles
llenarSelectTiposDocumento();

// 2) Función para validar que un campo solo contenga números
function validarCampoNumerico(inputElement) {
    const inputValue = inputElement.value.trim();
    if (!/^\d+$/.test(inputValue)) {
        // Si no son solo números, agregar clases de Bootstrap para mostrar la advertencia
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    } else {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
    }
}
// Inicializar validación para el campo "Número de Documento"
const nroDocumentoInput = document.getElementById('nroDocumento');
if (nroDocumentoInput) {
    nroDocumentoInput.addEventListener('input', function() {
        validarCampoNumerico(nroDocumentoInput);
    });
} else {
    console.error('Elemento con ID nroDocumento no encontrado.');
}
// Inicializar validación para el campo "Número - direccion"
const numeroInput = document.getElementById('numero');
if (numeroInput) {
    numeroInput.addEventListener('input', function() {
        validarCampoNumerico(numeroInput);
    });
} else {
    console.error('Elemento con ID numero no encontrado.');
}
// Inicializar validación para el campo "Teléfono"
const telefonoInput = document.getElementById('telefono');
if (telefonoInput) {
    telefonoInput.addEventListener('input', function() {
        validarCampoNumerico(telefonoInput);
    });
} else {
    console.error('Elemento con ID telefono no encontrado.');
}

// 3) funcion para verificar el formato de la foto
document.getElementById('foto').addEventListener('change', function(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const feedback = document.getElementById('feedback');
    const validFeedback = document.getElementById('valid-feedback');

    // Reset feedback
    feedback.style.display = 'none';
    validFeedback.style.display = 'none';

    if (file) {
        const fileName = file.name.toLowerCase();
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const fileExtension = fileName.split('.').pop();

        if (validExtensions.includes(fileExtension)) {
            // Show valid feedback
            validFeedback.style.display = 'block';
        } else {
            // Show invalid feedback
            feedback.style.display = 'block';
            
            // Clear the file input after 5 seconds
            setTimeout(() => {
                fileInput.value = '';
                feedback.style.display = 'none';
            }, 5000);
        }
    }
});

// 4) Función para seleccionar el rol y pasar tipo de usuario
function llenarSelectRoles() {
    var select = document.getElementById('rol');
    var idRolInput = document.getElementById('idRol');
    var identificadorRolInput = document.getElementById('identificadorRol');

    // Verificar que roles sea un array antes de usar forEach
    if (roles && Array.isArray(roles)) {
        roles.forEach(function(rol) {
            var option = document.createElement('option');
            option.value = rol[0]; // ID del rol, que se guardará en el input hidden
            option.textContent = rol[1]; // Tipo de rol, que se mostrará en el select
            option.dataset.identificador = rol[2]; // Identificador del rol, almacenado en el data attribute
            select.appendChild(option);
        });

        // Agregar evento para actualizar los inputs ocultos al seleccionar una opción
        select.addEventListener('change', function() {
            var selectedOption = this.options[this.selectedIndex];
            idRolInput.value = selectedOption.value; // Asignar el ID del rol seleccionado al input hidden
            identificadorRolInput.value = selectedOption.dataset.identificador; // Asignar el identificador del rol seleccionado al input hidden
        });
    } else {
        console.error("roles no es un array o está indefinido.");
    }
}
llenarSelectRoles();

// 5) Función para generar el nombre de usuario
function generarNombreUsuario() {
    var btnGenerarUsuario = document.getElementById('btn-generar-usuario');

    // Verificar si el botón "Generar Usuario" está habilitado
    if (!btnGenerarUsuario.disabled) {
        var identificadorRol = document.getElementById('identificadorRol').value;
        var siguienteIdUsuario = document.querySelector('input[name="siguiente_id_usuario"]').value;
        var usuarioInput = document.getElementById('usuario');

        // Generar el nombre de usuario concatenando el identificador del rol, un "0" y el siguiente ID de usuario
        var nombreUsuario = identificadorRol + '0' + siguienteIdUsuario;
        usuarioInput.value = nombreUsuario;

        console.log("Nombre de usuario generado:", nombreUsuario);  // Añadido para verificar el resultado
    } else {
        console.log("No se puede generar usuario porque el botón está deshabilitado.");
    }
}
// funcion para habilitar o deshabilitar el boton de generar usuario
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos relevantes
    var selectRoles = document.getElementById('rol');
    var btnGenerarUsuario = document.getElementById('btn-generar-usuario');
    var identificadorRolInput = document.getElementById('identificadorRol');

    // Función para generar el nombre de usuario
    function generarNombreUsuario() {
        var identificadorRol = identificadorRolInput.value;
        var siguienteIdUsuario = document.querySelector('input[name="siguiente_id_usuario"]').value;
        var usuarioInput = document.getElementById('usuario');

        // Generar el nombre de usuario concatenando el identificador del rol, un "0" y el siguiente ID de usuario
        var nombreUsuario = identificadorRol + '0' + siguienteIdUsuario;
        usuarioInput.value = nombreUsuario;

        console.log("Nombre de usuario generado:", nombreUsuario);  // Añadido para verificar el resultado
    }

    // Deshabilitar el botón y establecer estilo al inicio
    btnGenerarUsuario.disabled = true;
    btnGenerarUsuario.classList.add('btn-secondary');

    // Agregar evento de cambio al select de roles
    selectRoles.addEventListener('change', function() {
        // Obtener el valor del identificador de rol seleccionado
        var identificadorRol = identificadorRolInput.value;

        // Verificar si el identificador de rol tiene algún valor
        if (identificadorRol.trim() !== '') {
            // Habilitar el botón "Generar Usuario" y cambiar su estilo a verde
            btnGenerarUsuario.disabled = false;
            btnGenerarUsuario.classList.remove('btn-secondary');
            btnGenerarUsuario.classList.add('btn-success');
        } else {
            // Deshabilitar el botón "Generar Usuario" y cambiar su estilo a gris
            btnGenerarUsuario.disabled = true;
            btnGenerarUsuario.classList.remove('btn-success');
            btnGenerarUsuario.classList.add('btn-secondary');
        }
    });

    // Añadir evento de click para el botón "Generar Usuario"
    btnGenerarUsuario.addEventListener('click', function() {
        // Verificar si el botón "Generar Usuario" está habilitado
        if (!btnGenerarUsuario.disabled) {
            generarNombreUsuario();
        }
    });
});

// 6) Función para generar contraseñas
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

    document.getElementById('password').value = password;
}

// 7) Función para mostrar/ocultar la contraseña
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const showPassword = document.getElementById('show-password');
    if (showPassword.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// 8) Función para inicializar la validación de email
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

    // Funciones de validación de correo
    function contarPuntosDominio(dominio) {
        return (dominio.match(/\./g) || []).length;
    }

    function separarYContarPartes(oracion) {
        let partes = oracion.split('.');
        let longitudes = partes.map(parte => parte.length);
        return [partes, longitudes];
    }

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
            if (longitudes[1] !== 3) { // Verifica que después del primer punto haya exactamente 3 caracteres
                return false;
            }
        } else if (puntosDominio === 2) {
            if (longitudes[1] !== 3 || longitudes[2] !== 2) { // Verifica las longitudes después del primer y segundo punto
                return false;
            }
        }

        return true;
    }
}
document.addEventListener('DOMContentLoaded', initializeEmailValidation);

// 9) Funciones para Seleccioanr Pais, Region, Comuna.  y filtrar

// seleccion paises
function iniciarSeleccionDePaises() {
    // Seleccionar elementos relevantes del DOM
    var selectPaises = document.getElementById('pais');
    var idPaisInput = document.getElementById('idPaisInput');
    
    // Función para llenar el select de países
    function llenarSelectPaises() {
        // Verificar si paises es un array y tiene al menos un elemento
        if (Array.isArray(paises) && paises.length > 0) {
            // Iterar sobre cada array de países dentro de paises
            paises.forEach(function(arrayDePaises) {
                // Verificar si arrayDePaises es un array y tiene tres elementos
                if (Array.isArray(arrayDePaises) && arrayDePaises.length === 3) {
                    var idPais = arrayDePaises[0];
                    var nombrePais = arrayDePaises[1];

                    // Crear opción para cada país
                    var option = document.createElement('option');
                    option.value = idPais;
                    option.textContent = nombrePais;
                    selectPaises.appendChild(option);
                } else {
                    console.error("Formato de datos de países incorrecto:", arrayDePaises);
                }
            });
        } else {
            console.error("Formato de datos de países incorrecto:", paises);
        }
    }

    // Función para actualizar el ID del país seleccionado en el input oculto
    function actualizarIdPais() {
        var selectedPaisId = selectPaises.value;
        idPaisInput.value = selectedPaisId;
    }

    // Evento de cambio en el select de países para actualizar el input oculto
    selectPaises.addEventListener('change', actualizarIdPais);

    // Llamar a la función para llenar el select de países
    llenarSelectPaises();
}
document.addEventListener('DOMContentLoaded', iniciarSeleccionDePaises);

// seleccion regiones filtradas
function iniciarSelectPais() {
    var paisSelect = document.getElementById('pais');
    var idPaisInput = document.getElementById('idPaisInput');

    paisSelect.addEventListener('change', function() {
        var selectedPais = paisSelect.value;
        idPaisInput.value = selectedPais;
        inicializarSeleccionDeRegiones(selectedPais); // Pasar el idPais a la función de regiones
    });
}

function inicializarSeleccionDeRegiones(idPais) {
    // Seleccionar elementos relevantes del DOM
    var selectRegiones = document.getElementById('region');
    var idRegionInput = document.getElementById('idRegionInput');
    var pais_idpais = document.getElementById('pais_idpais');

    // Función para llenar el select de regiones
    function llenarSelectRegiones() {
        // Limpiar opciones actuales del select de regiones
        selectRegiones.innerHTML = '';

        // Crear opción predeterminada "Seleccione una región" (desactivada)
        var defaultOption = document.createElement('option');
        defaultOption.disabled = true;
        defaultOption.selected = true; // Puede no ser necesario, dependiendo del diseño
        defaultOption.textContent = "Seleccione una región";
        selectRegiones.appendChild(defaultOption);

        // Filtrar y llenar el select de regiones con opciones disponibles para el idPais
        regiones.forEach(function(region) {
            var idRegion = region[0];
            var nombreRegion = region[1];
            var regionPaisId = region[2]; // ID del país asociado a la región

            // Solo agregar la región si el idPais coincide
            if (regionPaisId == idPais) {
                var option = document.createElement('option');
                option.value = idRegion; // Usar idRegion como valor
                option.textContent = nombreRegion;
                selectRegiones.appendChild(option);
            }
        });
    }

    // Función para actualizar los inputs con la región seleccionada
    function actualizarIdRegion() {
        var selectedRegionId = selectRegiones.value; // Obtener el valor seleccionado
        var selectedRegion = regiones.find(region => region[0] == selectedRegionId); // Buscar la región en el array

        if (selectedRegion) {
            var idRegion = selectedRegion[0]; // ID de la región
            var idPais = selectedRegion[2]; // ID del país asociado a la región

            idRegionInput.value = idRegion; // Actualizar el input de ID de región
            pais_idpais.value = idPais; // Asignar el valor del país al input pais_idpais
        } else {
            console.error("No se encontró la región seleccionada en los datos proporcionados.");
        }
    }

    // Evento de cambio en el select de regiones para actualizar los inputs
    selectRegiones.addEventListener('change', actualizarIdRegion);

    // Llamar a la función para llenar el select de regiones
    llenarSelectRegiones();
}
document.addEventListener('DOMContentLoaded', function() {
    iniciarSelectPais(); 
});

//seleccion de comunas filtradas
function iniciarSelectRegion() {
    // Seleccionar elementos relevantes del DOM
    var regionSelect = document.getElementById('region');  // Asumiendo que es un select de regiones
    var idRegionInput = document.getElementById('idRegionInput'); // Input oculto para almacenar el ID de región

    regionSelect.addEventListener('change', function() {
        var selectedRegion = regionSelect.value;
        idRegionInput.value = selectedRegion;
        inicializarSeleccionDeComunas(selectedRegion); // Pasar el idRegion a la función de comunas
    });
}
function inicializarSeleccionDeComunas(idRegion) {
    // Suponiendo que `comunas` es un array que contiene las comunas con el formato [idComuna, nombreComuna, codigoPostal, idRegionProvincia]

    // Seleccionar elementos relevantes del DOM
    var selectComunas = document.getElementById('comuna');
    var idComunaInput = document.getElementById('idComunaInput');
    var codigoPostalInput = document.getElementById('codigoPostalInput');
    var idRegionFK = document.getElementById('idRegionFK');

    // Función para llenar el select de comunas
    function llenarSelectComunas() {
        // Limpiar opciones actuales del select de comunas
        selectComunas.innerHTML = '';

        // Crear opción predeterminada "Seleccione una comuna" (desactivada)
        var defaultOption = document.createElement('option');
        defaultOption.disabled = true;
        defaultOption.selected = true; // Puede no ser necesario, dependiendo del diseño
        defaultOption.textContent = "Seleccione una comuna";
        selectComunas.appendChild(defaultOption);

        // Filtrar y llenar el select de comunas con opciones disponibles para el idRegion
        comunas.forEach(function(comuna) {
            var idComuna = comuna[0];
            var nombreComuna = comuna[1];
            var codigoPostal = comuna[2];
            var idRegionProvincia = comuna[3];

            // Agregar la comuna al select solo si pertenece al idRegion especificado
            if (idRegionProvincia == idRegion) {
                var option = document.createElement('option');
                option.value = idComuna;
                option.textContent = nombreComuna;
                selectComunas.appendChild(option);
            }
        });
    }

    // Función para actualizar los inputs con la comuna seleccionada
    function actualizarIdComuna() {
        var selectedComunaIndex = selectComunas.selectedIndex;
        if (selectedComunaIndex !== -1) {
            var selectedOption = selectComunas.options[selectedComunaIndex]; // Obtener la opción seleccionada
            var idComuna = selectedOption.value; // Obtener el idComuna de la opción seleccionada
            var nombreComuna = selectedOption.textContent; // Obtener el nombre de la comuna de la opción seleccionada

            // Encontrar la comuna en el array de comunas
            var selectedComuna = comunas.find(function(comuna) {
                return comuna[0] == idComuna;
            });

            if (selectedComuna) {
                var codigoPostal = selectedComuna[2];
                var idRegionProvincia = selectedComuna[3];

                idComunaInput.value = idComuna;
                codigoPostalInput.value = codigoPostal;
                idRegionFK.value = idRegionProvincia;
            } else {
                console.error("No se encontró la comuna seleccionada en los datos proporcionados.");
            }
        } else {
            console.error("No se encontró la comuna seleccionada en los datos proporcionados.");
        }
    }

    // Evento de cambio en el select de comunas para actualizar los inputs
    selectComunas.addEventListener('change', actualizarIdComuna);

    // Llamar a la función para llenar el select de comunas
    llenarSelectComunas();
}
document.addEventListener('DOMContentLoaded', function() {
    iniciarSelectRegion(); 
});

// 10) Funcion para marcar habilitado o inhabilitado
function toggleSwitch() {
    const checkbox = document.getElementById('habilitarUsuarioSwitch');
    const label = document.getElementById('switchLabel');
    const input = document.getElementById('estadoHabilitacionUsuario');

    if (checkbox.checked) {
        label.textContent = 'Habilitado';
        input.value = 'True';
    } else {
        label.textContent = 'Inhabilitado';
        input.value = 'False';
    }
}

//11) Funcion para la previsualizacion 
// Función para obtener el tipo de doc seleccionado
function obtenerNombrePais(idPais) {
    var pais = paises.find(function(pais) {
        return pais[0] == idPais;
    });

    if (pais) {
        return pais[1];
    } else {
        console.error("No se encontró el país seleccionado en los datos proporcionados.");
        return "País no encontrado";
    }
}
// Función para obtener el nombre del país seleccionado
function obtenerTipoDoc(tipoDocumento) {
    var tipoDoc = tiposDocumento.find(function(tipoDoc) {
        return tipoDoc[0] == tipoDocumento;
    });

    if (tipoDoc) {
        return tipoDoc[1];
    } else {
        console.error("No se encontró el tipo de documento seleccionado en los datos proporcionados.");
        return "Tipo Doc no encontrado";
    }
}
// Función para obtener el nombre del país seleccionado
function obtenerRol(rol) {
    var tipoRol = roles.find(function(tipoRol) {
        return tipoRol[0] == rol;
    });

    if (tipoRol) {
        return tipoRol[1];
    } else {
        console.error("No se encontró el rol seleccionado en los datos proporcionados.");
        return "Rol no encontrado";
    }
}
// Función para obtener el nombre de la región seleccionada
function obtenerNombreRegion(idRegion) {
    var region = regiones.find(function(region) {
        return region[0] == idRegion;
    });

    if (region) {
        return region[1];
    } else {
        console.error("No se encontró la región seleccionada en los datos proporcionados.");
        return "Región no encontrada";
    }
}
// Función para obtener el nombre de la comuna seleccionada
function obtenerNombreComuna(idComuna) {
    var comuna = comunas.find(function(comuna) {
        return comuna[0] == idComuna;
    });

    if (comuna) {
        return comuna[1];
    } else {
        console.error("No se encontró la comuna seleccionada en los datos proporcionados.");
        return "Comuna no encontrada";
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Función para abrir la ventana de previsualización
    document.getElementById('previsualizarDatos').addEventListener('click', function() {
        // Obtener los datos del formulario
        var nombre1 = document.getElementById('nombre1').value;
        var nombre2 = document.getElementById('nombre2').value;
        var apellido1 = document.getElementById('apellido1').value;
        var apellido2 = document.getElementById('apellido2').value;
        var tipoDocumento = document.getElementById('tipoDocumento').value;
        var nroDocumento = document.getElementById('nroDocumento').value;
        var fechaNacimiento = document.getElementById('fechaNacimiento').value;
        var fechaAlta = document.getElementById('fechaAlta').value;
        var foto = document.getElementById('foto').files.length ? document.getElementById('foto').files[0].name : '';
        var calle = document.getElementById('calle').value;
        var numero = document.getElementById('numero').value;
        var piso = document.getElementById('piso').value;
        var departamento = document.getElementById('departamento').value;
        var rol = document.getElementById('rol').value;
        var usuario = document.getElementById('usuario').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var telefono = document.getElementById('telefono').value;
        var pais = document.getElementById('pais').value;
        var region = document.getElementById('region').value;
        var comuna = document.getElementById('comuna').value;
        var codigoPostal = document.getElementById('codigoPostalInput').value;
        var estadoHabilitacionUsuario = document.getElementById('estadoHabilitacionUsuario').value; // Obtener el valor 'True' o 'False'

        // Obtener IDs de país, región y comuna
        var idPais = document.getElementById('idPaisInput').value;
        var idRegion = document.getElementById('idRegionInput').value;
        var idComuna = document.getElementById('idComunaInput').value;

        // Obtener nombres de país, región y comuna usando las funciones definidas anteriormente
        var pais = obtenerNombrePais(idPais);
        var region = obtenerNombreRegion(idRegion);
        var comuna = obtenerNombreComuna(idComuna);
        var tipoDocumento = obtenerTipoDoc(tipoDocumento);
        var rol = obtenerRol(rol);


        // Crear el contenido HTML para la previsualización
        var contenidoHTML = `
            <html>
            <head>
                <title>Previsualización de Datos</title>
                <link rel="stylesheet" href="{{ url_for('static', filename='css/estilos_previsualizacion.css') }}">
                <link rel="stylesheet" href="/static/css/estilos_previsualizacion.css">
                <style>
                    
                </style>
            </head>
            <body>
                <div class="preview-container">
                    <h1>Previsualización de Usuario</h1>
                    <!-- Primer y segundo nombre -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>1er Nombre:</label>
                            <p>${nombre1}</p>
                        </div>
                        <div class="preview-item col">
                            <label>2do Nombre:</label>
                            <p>${nombre2}</p>
                        </div>
                    </div>
                
                    <!-- Primer y segundo apellido -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>1er Apellido:</label>
                            <p>${apellido1}</p>
                        </div>
                        <div class="preview-item col">
                            <label>2do Apellido:</label>
                            <p>${apellido2}</p>
                        </div>
                    </div>

                    <!-- Tipo y numero de documento -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Tipo Doc.:</label>
                            <p>${tipoDocumento}</p>
                        </div>
                        <div class="preview-item col">
                            <label>nro Doc.:</label>
                            <p>${nroDocumento}</p>
                        </div>
                    </div>

                    <!-- Fecha de Nacimiento y Fecha de Alta -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>F. Nacimiento:</label>
                            <p>${fechaNacimiento}</p>
                        </div>
                        <div class="preview-item col">
                            <label>F. Alta:</label>
                            <p>${fechaAlta}</p>
                        </div>
                    </div>
                
                    <!-- Foto -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>foto:</label>
                            <p>${foto}</p>
                        </div>
                    </div>

                    <!-- Calle y numero -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>calle:</label>
                            <p>${calle}</p>
                        </div>
                        <div class="preview-item col">
                            <label>numero:</label>
                            <p>${numero}</p>
                        </div>
                    </div>
                
                    <!-- Piso y departamento -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>piso:</label>
                            <p>${piso}</p>
                        </div>
                        <div class="preview-item col">
                            <label>departamento:</label>
                            <p>${departamento}</p>
                        </div>
                    </div>   

                    <!-- Campo de Rol -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Rol:</label>
                            <p>${rol}</p>
                        </div>
                        <div class="preview-item col">
                            <label>Nombre Usuario:</label>
                            <p>${usuario}</p>
                        </div>
                    </div>
                        

                    <!-- Email y Contraseña -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Email:</label>
                            <p>${email}</p>
                        </div>
                        <div class="preview-item col">
                            <label>Contraseña:</label>
                            <p>${password}</p>
                        </div>
                    </div>

                    <!-- Teléfono -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Telefono:</label>
                            <p>${telefono}</p>
                        </div>
                    </div>

                    <!-- País y Región -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Pais:</label>
                            <p>${pais}</p>
                        </div>
                        <div class="preview-item col">
                            <label>Region:</label>
                            <p>${region}</p>
                        </div>
                    </div>

                    <!-- Comuna y código postal -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Comuna:</label>
                            <p>${comuna}</p>
                        </div>
                        <div class="preview-item col">
                            <label>Cod. Postal:</label>
                            <p>${codigoPostal}</p>
                        </div>
                    </div>

                    <!-- Habilitar Usuario -->
                    <div class="row g-3">
                        <div class="preview-item col">
                            <label>Habilitado</label>
                            <p>${estadoHabilitacionUsuario === 'True' ? 'Sí' : 'No'}</p>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="preview-item col">
                            <button id="cerrarVentana" class="btn btn-primary">Cerrar</button>
                        </div>
                    </div>

                </div>
                <script>
                    document.getElementById('cerrarVentana').addEventListener('click', function() {
                        window.close();
                    });
                </script>
            </body>
            </html>
        `;

        // Abrir una nueva ventana o pestaña con el contenido generado
        var ventanaPrevisualizacion = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
        ventanaPrevisualizacion.document.open();
        ventanaPrevisualizacion.document.write(contenidoHTML);
        ventanaPrevisualizacion.document.close();
    });
});

initializeEmailValidation();




