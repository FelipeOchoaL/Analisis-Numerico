from flask import Flask, render_template, request, jsonify
import requests
import json

app = Flask(__name__)

# URL base de la API
API_BASE_URL = "http://127.0.0.1:8000/api"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ecuaciones-no-lineales')
def ecuaciones_no_lineales():
    return render_template('ecuaciones_no_lineales.html')

@app.route('/errores')
def errores():
    return render_template('errores.html')

@app.route('/series-taylor')
def series_taylor():
    return render_template('series_taylor.html')

# Rutas proxy para comunicarse con la API
@app.route('/api/biseccion', methods=['POST'])
def proxy_biseccion():
    try:
        response = requests.post(
            f"{API_BASE_URL}/ecuaciones-no-lineales/biseccion",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/punto-fijo', methods=['POST'])
def proxy_punto_fijo():
    try:
        response = requests.post(
            f"{API_BASE_URL}/ecuaciones-no-lineales/punto-fijo",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/regla-falsa', methods=['POST'])
def proxy_regla_falsa():
    try:
        response = requests.post(
            f"{API_BASE_URL}/ecuaciones-no-lineales/regla-falsa",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/busqueda-incremental', methods=['POST'])
def proxy_busqueda_incremental():
    try:
        response = requests.post(
            f"{API_BASE_URL}/ecuaciones-no-lineales/busqueda-incremental",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/error-absoluto', methods=['POST'])
def proxy_error_absoluto():
    try:
        response = requests.post(
            f"{API_BASE_URL}/errores/error-absoluto",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/error-relativo', methods=['POST'])
def proxy_error_relativo():
    try:
        response = requests.post(
            f"{API_BASE_URL}/errores/error-relativo",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/propagacion-error', methods=['POST'])
def proxy_propagacion_error():
    try:
        response = requests.post(
            f"{API_BASE_URL}/errores/propagacion-error",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/taylor-coseno', methods=['POST'])
def proxy_taylor_coseno():
    try:
        response = requests.post(
            f"{API_BASE_URL}/series-taylor/coseno",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/taylor-seno', methods=['POST'])
def proxy_taylor_seno():
    try:
        response = requests.post(
            f"{API_BASE_URL}/series-taylor/seno",
            json=request.json,
            timeout=30
        )
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
