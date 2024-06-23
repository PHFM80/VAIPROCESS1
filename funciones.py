from flask import redirect, url_for
import re
from werkzeug.security import generate_password_hash
from PIL import Image
import io
import os
from werkzeug.utils import secure_filename



# funcion para verificar el usuario y derivar al dashboard correspondiente
def get_dashboard_page(username):
    # Derivar a diferentes páginas dependiendo del prefijo del username
    if username.startswith('uso01'):
        return "dashboard1"
    elif username.startswith('uso02'):
        return "dashboard2"
    elif username.startswith('uso03'):
        return "dashboard3"
    elif username.startswith('uso04'):
        return "dashboard4"
    else:
        # Si no coincide con ninguno de los patrones anteriores, redirigir a un dashboard genérico
        return "login"
    
# Funcion para asignar a cada usuario el dashboard correspondiente
def get_user_type(username):
    if username.startswith('uso01'):
        return "Administrador"
    elif username.startswith('uso02'):
        return "Administrativo"
    elif username.startswith('uso03'):
        return "Avanzado"
    elif username.startswith('uso04'):
        return "Usuario"
    else:
        return "Desconocido"

    
# funciones de manejo de error de paginas
def status_404(error):
    return "<h1>Pagina no encontrada...<h1>", 404

def status_401(error):
    return redirect(url_for('index'))

# Funcion para renderizar los datos de rol, tipodocumento, paises, regiones, comunas que luego seran pasadas a la plantilla cargar usuatio

def buscarPais(db):
    cursor = db.connection.cursor()
    cursor.execute("SELECT idPais, nombrePais, codigoTelefonico FROM paises")
    paises = cursor.fetchall()
    cursor.close()
    return paises

def buscarRegion(db):
    cursor = db.connection.cursor()
    cursor.execute("SELECT idRegion_Provincia, region_Provincia, paises_idpais FROM regiones_provincias ")
    regiones = cursor.fetchall()
    cursor.close()
    return regiones

def buscarComuna(db):
    cursor = db.connection.cursor()
    cursor.execute("SELECT idComuna_Departamento, comuna_Departamento, codigoPostal, regiones_provincias_idRegion_Provincia FROM comunas_departamentos ")
    comunas = cursor.fetchall()
    cursor.close()
    return comunas

def buscarTiposDocumento(db):
    cursor = db.connection.cursor()
    cursor.execute("SELECT idTipoDeDocumento, tipoDeDocumento FROM tiposdedocumentos")
    tipos_documentos = cursor.fetchall()
    cursor.close()
    return tipos_documentos

def buscarRoles(db):
    cursor = db.connection.cursor()
    cursor.execute("SELECT idRol, tipoRol, identificadorDeRol FROM roles")
    roles = cursor.fetchall()
    cursor.close()
    return roles

def obtenerSiguienteIdUsuario(db):
    cursor = db.connection.cursor()
    cursor.execute("SELECT MAX(id) FROM usuarios")
    max_id = cursor.fetchone()[0]
    cursor.close()
    if max_id is None:
        return 1
    else:
        return max_id + 1

def buscarRegionPorPais(db, pais_id):
    cursor = db.connection.cursor()
    query = "SELECT idRegion_Provincia, region_Provincia, paises_idpais FROM regiones_provincias WHERE paises_idpais = %s"
    cursor.execute(query, (pais_id,))
    regiones = cursor.fetchall()
    cursor.close()
    return regiones

def validarCorreo(correo):
    if ' ' in correo:
        return False

    if correo.count('@') != 1:
        return False
    
    direccion, dominio = correo.split('@')

    if len(direccion) < 5 or not direccion[0].isalpha() or not re.match(r'^[a-zA-Z0-9.]+$', direccion) or '..' in direccion:
        return False

    if dominio.startswith('.') or dominio.endswith('.'):
        return False

    puntosDominio = dominio.count('.')
    if puntosDominio < 1 or puntosDominio > 2:
        return False

    partes = dominio.split('.')
    longitudes = [len(parte) for parte in partes]

    if puntosDominio == 1:
        if longitudes[-1] < 3:
            return False
    elif puntosDominio == 2:
        if longitudes[-2] < 3 or longitudes[-1] < 2:
            return False

    return True

def hash_password(password):
    return generate_password_hash(password)


def editarNombreFoto(foto, usuario):
    if foto and allowed_file(foto.filename):
        # Cambiar la extensión a WebP y el nombre de la foto al nombre del usuario
        nombre_archivo = f"{secure_filename(usuario)}.webp"
        return nombre_archivo
    
    return None
# Función auxiliar para verificar la extensión permitida
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'jpg', 'jpeg', 'png', 'gif'}


def insertar_usuario(db, datos_usuario):
    try:
        cursor = db.connection.cursor()
        query = """
            INSERT INTO usuarios (id, nombre1, nombre2, apellido1, apellido2, fechaNacimiento, 
            nroDocumento, foto, fechaDeAlta, habilitado, calle, numero, piso, departamento, 
            email, usuario, password, telefono, tiposdedocumentos_idTipoDeDocumento, 
            roles_idRol, paises_idpais, regiones_provincias_idRegion_Provincia, comunas_departamentos_idComuna_Departamento
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (
            datos_usuario['id'], datos_usuario['nombre1'], datos_usuario['nombre2'], datos_usuario['apellido1'], datos_usuario['apellido2'], 
            datos_usuario['fechaNacimiento'], datos_usuario['nroDocumento'], datos_usuario['foto'], datos_usuario['fechaDeAlta'], 
            datos_usuario['habilitado'], datos_usuario['calle'], datos_usuario['numero'], datos_usuario['piso'], 
            datos_usuario['departamento'], datos_usuario['email'], datos_usuario['usuario'], datos_usuario['password'], 
            datos_usuario['telefono'], datos_usuario['tiposdedocumentos_idTipoDeDocumento'], datos_usuario['roles_idRol'], 
            datos_usuario['paises_idpais'], datos_usuario['regiones_provincias_idRegion_Provincia'], 
            datos_usuario['comunas_departamentos_idComuna_Departamento']
        ))
        db.connection.commit()
    except Exception as e:
        db.connection.rollback()
        print("Error al ejecutar la consulta:", e)
        raise e  
    finally:
        cursor.close()





