from flask import redirect, url_for


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