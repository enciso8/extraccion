from flask import Flask, render_template, jsonify
from flask_cors import CORS
from biodiversity_data_extractor import get_biodiversity_data

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/mapas')
def mapas():
    biodiversity_data = get_biodiversity_data()
    return render_template('mapas.html', tables=biodiversity_data)


if __name__ == '__main__':
    app.run(debug=True)