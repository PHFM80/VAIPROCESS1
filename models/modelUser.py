from .entities.user import Usuario

class modelUsuario:
    @classmethod
    def login(cls, db, usuario):
        try:
            cursor = db.connection.cursor()
            sql = """SELECT id, nombre1, nombre2, apellido1, apellido2, fechaNacimiento, nroDocumento, foto,
                             fechaDeAlta, habilitado, calle, numero, piso, departamento, email, usuario, password, telefono,
                             tiposdedocumentos_idTipoDeDocumento, roles_idRol, paises_idpais,
                             regiones_provincias_idRegion_Provincia, comunas_departamentos_idComuna_Departamento 
                     FROM usuarios WHERE email = %s"""
            cursor.execute(sql, (usuario.email,))
            row = cursor.fetchone()
            if row is not None:
                logged_user = Usuario(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9],
                                      row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18],
                                      row[19], row[20], row[21], row[22])
                return logged_user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def get_by_id(cls, db, id):
        try:
            cursor = db.connection.cursor()
            sql = """SELECT id, nombre1, nombre2, apellido1, apellido2, fechaNacimiento, nroDocumento, foto,
                             fechaDeAlta, habilitado, calle, numero, piso, departamento, email, usuario, password, telefono,
                             tiposdedocumentos_idTipoDeDocumento, roles_idRol, paises_idpais,
                             regiones_provincias_idRegion_Provincia, comunas_departamentos_idComuna_Departamento 
                     FROM usuarios WHERE id = %s"""
            cursor.execute(sql, (id,))
            row = cursor.fetchone()
            if row is not None:
                user = Usuario(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9],
                               row[10], row[11], row[12], row[13], row[14], row[15], row[16], row[17], row[18],
                               row[19], row[20], row[21], row[22])
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def create(cls, db, usuario):
        try:
            cursor = db.connection.cursor()
            sql = """INSERT INTO usuarios (nombre1, nombre2, apellido1, apellido2, fechaNacimiento, nroDocumento, foto,
                                            fechaDeAlta, habilitado, calle, numero, piso, departamento, email, usuario, password, telefono,
                                            tiposdedocumentos_idTipoDeDocumento, roles_idRol, paises_idpais,
                                            regiones_provincias_idRegion_Provincia, comunas_departamentos_idComuna_Departamento) 
                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            cursor.execute(sql, (usuario.nombre1, usuario.nombre2, usuario.apellido1, usuario.apellido2,
                                 usuario.fechaNacimiento, usuario.nroDocumento, usuario.foto, usuario.fechaDeAlta,
                                 usuario.habilitado, usuario.calle, usuario.numero, usuario.piso, usuario.departamento,
                                 usuario.email, usuario.usuario, usuario.password, usuario.telefono,
                                 usuario.tiposdedocumentos_idTipoDeDocumento, usuario.roles_idRol, usuario.paises_idpais,
                                 usuario.regiones_provincias_idRegion_Provincia, usuario.comunas_departamentos_idComuna_Departamento))
            db.connection.commit()
            return True
        except Exception as ex:
            db.connection.rollback()
            raise Exception(ex)
