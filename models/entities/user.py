from werkzeug.security import check_password_hash
from flask_login import UserMixin

class Usuario(UserMixin):
    def __init__(self, id, nombre1, nombre2, apellido1, apellido2, fechaNacimiento, nroDocumento, foto,
                 fechaDeAlta, habilitado, calle, numero, piso, departamento, email, usuario, password, telefono,
                 tiposdedocumentos_idTipoDeDocumento, roles_idRol, paises_idpais,
                 regiones_provincias_idRegion_Provincia, comunas_departamentos_idComuna_Departamento):
        self.id = id
        self.nombre1 = nombre1
        self.nombre2 = nombre2
        self.apellido1 = apellido1
        self.apellido2 = apellido2
        self.fechaNacimiento = fechaNacimiento
        self.nroDocumento = nroDocumento
        self.foto = foto
        self.fechaDeAlta = fechaDeAlta
        self.habilitado = habilitado
        self.calle = calle
        self.numero = numero
        self.piso = piso
        self.departamento = departamento
        self.email = email
        self.usuario = usuario
        self.password = password
        self.telefono = telefono
        self.tiposdedocumentos_idTipoDeDocumento = tiposdedocumentos_idTipoDeDocumento
        self.roles_idRol = roles_idRol
        self.paises_idpais = paises_idpais
        self.regiones_provincias_idRegion_Provincia = regiones_provincias_idRegion_Provincia
        self.comunas_departamentos_idComuna_Departamento = comunas_departamentos_idComuna_Departamento

    @classmethod
    def checkPassword(cls, hashed_password, password):
        return check_password_hash(hashed_password, password)
