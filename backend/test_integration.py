import unittest
import requests

class TestAPIIntegration(unittest.TestCase):
    
    BASE_URL = "http://localhost:5000/predict"
    
    def test_predict_endpoint(self):
        # Testing input data 
        sample_data = {
            "age": 32,
            "gender": "female",
            "hypertension": "no",
            "heart_disease": "no",
            "smoking_history": "never",
            "bmi": 27.32,
            "HbA1c_level": ,
            "blood_glucose_level": 100
        }
        
        # Make a POST request to the /predict endpoint
        response = requests.post(self.BASE_URL, json=sample_data)
        
        # Checking if the request was successful (HTTP status code 200)
        self.assertEqual(response.status_code, 200)
        
        # Parse the JSON response
        result = response.json()
        
        self.assertIn('prediction', result)
        
        print(f"Prediction result: {result['prediction']}")
        
if __name__ == "__main__":
    unittest.main()
