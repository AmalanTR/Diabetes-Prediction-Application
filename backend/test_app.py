import unittest
import requests

class TestAPI(unittest.TestCase):
    def test_predict(self):
        url = "http://localhost:5000/predict"
        payload = {
            "age": 45,
            "gender": "male",
            "hypertension": "no",
            "heart_disease": "yes",
            "smoking_history": "never",
            "bmi": 25.0,
            "HbA1c_level": 5.2,
            "blood_glucose_level": 120
        }
        response = requests.post(url, json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertIn('prediction', response.json())

if __name__ == '__main__':
    unittest.main()
