from flask import Flask, render_template, redirect, flash, request, send_file, url_for, request, jsonify
from configuraciones import config
from flask_mysqldb import MySQL
from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from funciones import get_dashboard_page, status_401, status_404, get_user_type
from datetime import datetime
from models import db, Usuario, TipoDocumento, Rol, Pais, Region, Comuna


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


@app.route('/cargarUsuario')
def cargarUsuario():
    tipos_de_documento = TipoDocumento.query.all()
    roles = Rol.query.all()
    paises = Pais.query.all()
    fecha_actual = datetime.now().strftime('%Y-%m-%d')
    return render_template('_cargarUsuario_.html', tipos_de_documento=tipos_de_documento, roles=roles, paises=paises, fecha_actual=fecha_actual)

@app.route('/cargarUsuario', methods=['POST'])
def cargarUsuario():
    # Obtén los datos del formulario
    datos_usuario = request.form.to_dict()
    # Aquí deberás realizar la validación y almacenamiento en la base de datos
    nuevo_usuario = Usuario(
        id=Usuario.query.order_by(Usuario.id.desc()).first().id + 1,
        nombre1=datos_usuario['nombre1'],
        nombre2=datos_usuario['nombre2'],
        apellido1=datos_usuario['apellido1'],
        apellido2=datos_usuario['apellido2'],
        fechaNacimiento=datos_usuario['fechaNacimiento'],
        tiposdedocumentos_idTipoDeDocumento=datos_usuario['tipoDocumento'],
        nroDocumento=datos_usuario['nroDocumento'],
        foto=datos_usuario['foto'],
        fechaDeAlta=datos_usuario['fechaDeAlta'],
        habilitado=datos_usuario['habilitado'] == 'on',
        calle=datos_usuario['calle'],
        numero=datos_usuario['numero'],
        piso=datos_usuario.get('piso', '0'),
        departamento=datos_usuario.get('departamento', '0'),
        email=datos_usuario['email'],
        roles_idRol=datos_usuario['rol'],
        usuario=datos_usuario['usuario'],
        password=datos_usuario['password'],
        codigoPais=datos_usuario['codigoPais'],
        telefono=datos_usuario['telefono'],
        paises_idpais=datos_usuario['pais'],
        regiones_provincias_idRegion_Provincia=datos_usuario['region'],
        comunas_departamentos_idComuna_Departamento=datos_usuario['comuna']
    )
    db.session.add(nuevo_usuario)
    db.session.commit()
    return "Usuario cargado correctamente"

@app.route('/get_regiones/<int:pais_id>')
def get_regiones(pais_id):
    regiones = Region.query.filter_by(pais_id=pais_id).all()
    return jsonify([{'id': region.id, 'nombre': region.nombre} for region in regiones])

@app.route('/get_comunas/<int:region_id>')
def get_comunas(region_id):
    comunas = Comuna.query.filter_by(region_id=region_id).all()
    return jsonify([{'id': comuna.id, 'nombre': comuna.nombre} for comuna in comunas])






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
