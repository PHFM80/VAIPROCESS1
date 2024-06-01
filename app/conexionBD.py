
#Importando Libreria mysql.connector para conectar Python con MySQL
import mysql.connector

def conectarBD():
    mydb = mysql.connector.connect(
        host ="localhost",
        user ="root",
        passwd ="",
        database = "datosdepersonas" # aca debo colocar la base de datos que voy a utilizar
        )
    return mydb