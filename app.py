from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/nosotros")
def nosotros():
    return render_template("nosotros.html")

@app.route("/transportes")
def transporte():
    return render_template("transporte.html")

@app.route("/destinos")
def destinos():
    return render_template("destinos.html")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

# Manejo de error 404 (Página no encontrada)
@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)