from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    meals_required = data["meals_required"]
    people_served = data["people_served"]

    prediction = model.predict(
        [[meals_required, people_served]]
    )

    return jsonify({
        "priority": prediction[0]
    })

if __name__ == "__main__":
    app.run(port=8000)