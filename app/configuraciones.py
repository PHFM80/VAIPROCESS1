

class ConfigSK:
    SECRET_KEY = "@Pepeflores1980"

# Clase development para configurar el refresco de la aplicacion
class DevelopmentConfig(ConfigSK):
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'root'
    MYSQL_DB = 'datosdepersonas' # aca debo colocar la base de datos que voy a utilizar

config = {
    "development" : DevelopmentConfig

}



