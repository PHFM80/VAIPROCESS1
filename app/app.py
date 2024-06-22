import os
from flask import Flask, render_template, redirect, flash, request, send_file, url_for, request, jsonify
import json
from configuraciones import config
from flask_mysqldb import MySQL
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from funciones import hash_password, status_401, status_404, get_user_type, buscarComuna, buscarPais, buscarRegion, buscarRoles, buscarTiposDocumento, obtenerSiguienteIdUsuario, generarContrasena, generate_password_hash, validarCorreo,  buscarRegionPorPais



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




   


@app.route('/cargarUsuario', methods=['GET', 'POST'])
@login_required
def cargarUsuario():
    if request.method == 'GET':
        # Obtener los datos necesarios para cargar la página inicialmente
        siguiente_id_usuario = obtenerSiguienteIdUsuario(db)
        roles = buscarRoles(db)
        print (roles)
        print(type(roles))
        paises = buscarPais(db)
        regiones = buscarRegion(db)  
        comunas = buscarComuna(db)  
        tipos_documento = buscarTiposDocumento(db)
        print (tipos_documento)
        print (type(tipos_documento))

        # Pasar los datos a la plantilla como variables individuales
        return render_template('_cargarUsuario_.html', siguiente_id_usuario=siguiente_id_usuario,
                            roles=roles, paises=paises, regiones=regiones, comunas=comunas, tipos_documento=tipos_documento)


    elif request.method == 'POST':
        print ("el usaurio se cargo exitosamente")
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


