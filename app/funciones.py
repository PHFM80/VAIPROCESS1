from flask import redirect, url_for
import re
import random
import string
from werkzeug.security import generate_password_hash



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




def generarContrasena():
    mayusculas = string.ascii_uppercase
    minusculas = string.ascii_lowercase
    digitos = string.digits
    caracteres_especiales = string.punctuation + 'ñÑ'

    all_characters = mayusculas + minusculas + digitos + caracteres_especiales
    password = [
        random.choice(mayusculas),
        random.choice(minusculas),
        random.choice(digitos),
        random.choice(caracteres_especiales)
    ]

    password += random.choices(all_characters, k=11)
    random.shuffle(password)
    
    return ''.join(password)

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






