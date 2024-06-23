import os
from flask import Flask, render_template, redirect, flash, request, send_file, url_for, request, jsonify
from configuraciones import config
from flask_mysqldb import MySQL
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from funciones import hash_password, status_401, status_404, get_user_type, buscarComuna, buscarPais, buscarRegion, buscarRoles, buscarTiposDocumento, obtenerSiguienteIdUsuario, generate_password_hash, validarCorreo,  buscarRegionPorPais, editarNombreFoto, insertar_usuario
from werkzeug.utils import secure_filename
import shutil



# Importación de la clase usuario desde modelUser y entity
from models.modelUser import modelUsuario
from models.entities.user import Usuario

# 1) Inicializador de la aplicación
app = Flask(__name__)

# 2) Cargar configuración
app.config.from_object(config['development'])

# 3) Inicializador de la base de datos
db = MySQL(app)

# 4) cargador de usuario
login_manager_app = LoginManager(app)
@login_manager_app.user_loader
def load_user(id):
    return modelUsuario.get_by_id(db, id)


# 5) Inicializar las rutas
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "POST":      
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']

        # Usuario simplificado para el proceso de login
        usuario_login = Usuario(id=None, nombre1=None, nombre2=None, apellido1=None, apellido2=None, 
                                fechaNacimiento=None, nroDocumento=None, foto=None, fechaDeAlta=None, 
                                habilitado=None, calle=None, numero=None, piso=None, departamento=None, 
                                email=email, usuario=username, password=password, telefono=None, 
                                tiposdedocumentos_idTipoDeDocumento=None, roles_idRol=None, paises_idpais=None, 
                                regiones_provincias_idRegion_Provincia=None, comunas_departamentos_idComuna_Departamento=None)

        logged_user = modelUsuario.login(db, usuario_login)
        if logged_user:
            if logged_user.usuario != username:
                flash("Nombre de usuario incorrecto.")
            elif not Usuario.checkPassword(logged_user.password, password):
                flash("Contraseña incorrecta.")
            elif not logged_user.habilitado:
                flash("Usuario inhabilitado.")
                return redirect(url_for('index'))  # Redirigir a la página de índice (index)
            else:
                login_user(logged_user)
                return redirect(url_for('dashboard'))
        else:
            flash("Correo electrónico no encontrado.")

    return render_template("login.html")



@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/dashboard')
@login_required
def dashboard():
    user_type = get_user_type(current_user.usuario)
    return render_template('dashboard.html', user_type=user_type)


# Configuración del directorio donde se guardarán las fotos
UPLOAD_FOLDER = os.path.join('static', 'users_images')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Asegúrate de que el directorio de carga exista
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/cargarUsuario', methods=['GET', 'POST'])
@login_required
def cargarUsuario():
    if request.method == 'GET':
        # Obtener los datos necesarios para cargar la página inicialmente
        siguiente_id_usuario = obtenerSiguienteIdUsuario(db)
        roles = buscarRoles(db)
        paises = buscarPais(db)
        regiones = buscarRegion(db)  
        comunas = buscarComuna(db)  
        tipos_documento = buscarTiposDocumento(db)

        # Pasar los datos a la plantilla como variables individuales
        return render_template('_cargarUsuario_.html', siguiente_id_usuario=siguiente_id_usuario,
                            roles=roles, paises=paises, regiones=regiones, comunas=comunas, tipos_documento=tipos_documento)

    elif request.method == 'POST':
        # Obtener los datos del formulario
        id = obtenerSiguienteIdUsuario(bd)
        print (f"El id es: {id}")
        nombre1 = request.form['nombre1']
        nombre2 = request.form['nombre2']
        apellido1 = request.form['apellido1']
        apellido2 = request.form['apellido2']
        fechaNacimiento = request.form['fechaNacimiento']
        nroDocumento = request.form['nroDocumento']
        fechaDeAlta = request.form['fechaAlta']
        habilitado = 'estadoHabilitacionUsuario' in request.form
        calle = request.form['calle']
        numero = request.form['numero']
        piso = request.form['piso']
        departamento = request.form['departamento']
        email = request.form['email']
        usuario = request.form['usuario']
        password = hash_password(request.form['password'])
        telefono = request.form['telefono']
        tiposdedocumentos_idTipoDeDocumento = request.form['idTipoDocumento']
        roles_idRol = request.form['idRol']
        paises_idpais = request.form['idPaisInput']
        regiones_provincias_idRegion_Provincia = request.form['idRegionInput']
        comunas_departamentos_idComuna_Departamento = request.form['idComunaInput']
        # Manejar la subida de la foto
        if 'foto' in request.files:
            foto = request.files['foto']
            if foto.filename != '':
                nombre_archivo_webp = editarNombreFoto(foto, usuario)
                if nombre_archivo_webp:
                    # Guardar la imagen en la carpeta de carga especificada en la configuración
                    ruta_guardado = os.path.join(app.config['UPLOAD_FOLDER'], nombre_archivo_webp)
                    foto.save(ruta_guardado)
            else:
                # Asignar una foto predeterminada si no se subió ninguna foto
                ruta_predeterminada = os.path.join('static', 'users_images', 'uso.webp')
                nombre_archivo_webp = f"{usuario}.webp"
                ruta_guardado = os.path.join(app.config['UPLOAD_FOLDER'], nombre_archivo_webp)
                shutil.copy(ruta_predeterminada, ruta_guardado)
                

        datos_usuario = {
            'id': id, 'nombre1': nombre1, 'nombre2': nombre2, 'apellido1': apellido1, 'apellido2': apellido2,
            'fechaNacimiento': fechaNacimiento, 'nroDocumento': nroDocumento, 'foto': nombre_archivo_webp,
            'fechaDeAlta': fechaDeAlta, 'habilitado': habilitado, 'calle': calle, 'numero': numero, 'piso': piso,
            'departamento': departamento, 'email': email, 'usuario': usuario, 'password': password,
            'telefono': telefono, 'tiposdedocumentos_idTipoDeDocumento': tiposdedocumentos_idTipoDeDocumento,
            'roles_idRol': roles_idRol, 'paises_idpais': paises_idpais,
            'regiones_provincias_idRegion_Provincia': regiones_provincias_idRegion_Provincia,
            'comunas_departamentos_idComuna_Departamento': comunas_departamentos_idComuna_Departamento
        }

        try:
            insertar_usuario(db, datos_usuario)
            print("El usuario se cargó exitosamente")
        except Exception as e:
            print(f"Error al cargar el usuario: {e}")

        return redirect(url_for('dashboard'))








@app.route('/eliminarUsuario')
def eliminarUsuario():
    return render_template('_eliminarUsuario_.html')

@app.route('/modificarUsuario')
def modificarUsuario():
    return render_template('_modificarUsuario_.html')

@app.route('/habilitarUsuario')
def habilitarUsuario():
    return render_template('_habilitarUsuario_.html')


# 6)Inicializador de la aplicacion
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(401, status_401)
    app.register_error_handler(404, status_404)
    app.run(port=5000)


