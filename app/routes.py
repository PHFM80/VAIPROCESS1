from flask import render_template


def init_routes(app):

    @app.route("/")
    def index():
        return render_template ("index.html")


    @app.route("/loggin")
    def loggin():
        return render_template ("loggin.html")


    @app.route("/loggin/dashboard1")
    def dashboarduso1():
        return render_template ("dashboard1.html")
    
    @app.route("/loggin/dashboard2")
    def dashboarduso2():
        return render_template ("dashboard2.html")
    
    @app.route("/loggin/dashboard3")
    def dashboarduso3():
        return render_template ("dashboard3.html")
    
    @app.route("/loggin/dashboard4")
    def dashboarduso4():
        return render_template ("dashboard4.html")