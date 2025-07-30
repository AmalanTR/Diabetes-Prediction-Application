# Importing necessary libraries
from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Loading the trained model
model = joblib.load(r'C:\Users\KARTHIK\sugarguard\backend\best_model.pkl')

@app.route('/')
def helloWorld():
    return "Hello, cross-origin-world!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        required_fields = ['age', 'gender', 'hypertension', 'heart_disease', 'smoking_history', 'bmi', 'HbA1c_level', 'blood_glucose_level']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        age = data['age']
        gender = 1 if data['gender'] == 'male' else 0
        hypertension = 1 if data['hypertension'] == 'yes' else 0

        heart_disease = 1 if data['heart_disease'] == 'yes' else 0


         # Mapping smoking history to numerical values
        smoking_history_map = {
            'never': 0,
            'no_info': 1,
            'current_user': 2,
            'not_current': 3,
            'former': 4
        }
        smoking_history = smoking_history_map[data['smoking_history']]
        
        bmi = data['bmi']
        HbA1c_level = data['HbA1c_level']
        blood_glucose_level = data['blood_glucose_level']

        # Converting input data to numpy array
        input_data = np.array([[age, gender, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, blood_glucose_level]])

        # Making prediction
        prediction = model.predict(input_data)

        # To return the result as JSON
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
