from flask import Flask, render_template, request

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

@app.route("/contacto", methods=["GET", "POST"])
def contacto():
    if request.method == "POST":
        # Recibir los datos validados por JS
        nombre = request.form.get("nombre")
        tour_seleccionado = request.form.get("tour")
        vehiculo = request.form.get("movilidad")
        personas = request.form.get("personas")
        
        print(f"Nueva reserva de {nombre} para {tour_seleccionado} en {vehiculo}")
        
        
        return render_template("index.html", success=True) 
        
    return render_template("contacto.html")

# Manejo de error 404 (Página no encontrada)
@app.errorhandler(404)
def page_not_found(error):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)