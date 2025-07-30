import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    hypertension: 'no',
    heart_disease: 'yes',
    smoking_history: 'never',
    bmi: '',
    HbA1c_level: '',
    blood_glucose_level: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Converting form data values to numbers before sending them
  const dataToSend = {
    ...formData,
    age: Number(formData.age),
    bmi: Number(formData.bmi),
    HbA1c_level: Number(formData.HbA1c_level),
    blood_glucose_level: Number(formData.blood_glucose_level)
  };

  try {
    // Sending the converted data to the backend
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)  // Using dataToSend here
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Prediction Error:", errorData.error);
      setPrediction(`Error: ${errorData.error}`);
      return;
    }

    const result = await response.json();
    setPrediction(result.prediction);
  } catch (error) {
    console.error("Fetch Error:", error);
    setPrediction("Error: Unable to fetch prediction. Please try again later.");
  }
};
  

  return (
    <div className="app">
      <h1><b>Diabetes Prediction</b></h1>
      <div className="form-container">
        <div className="form-group">
          <h2><b>Check Your Diabetes Risk</b></h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-col">
                <div className="form-field">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
                </div>
              </div>
              <div className="form-col">
                <div className="form-field">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <div className="form-field">
                  <label>Hypertension</label>
                  <select name="hypertension" value={formData.hypertension} onChange={handleChange}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="form-col">
              <div className="form-field">
               <label>Heart Disease</label>
                <select name="heart_disease" value={formData.heart_disease} onChange={handleChange}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
              </div>
              </div>
              <div className="form-col">
                <div className="form-field">
                  <label>Smoking History</label>
                  <select name="smoking_history" value={formData.smoking_history} onChange={handleChange}>
                    <option value="never">Never</option>
                    <option value="no_info">No Information</option>
                    <option value="current_user">Current User</option>
                    <option value="not_current">Not Current User</option>
                    <option value="former">Former User</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <div className="form-field">
                  <label>BMI</label>
                  <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} placeholder="BMI" required />
                </div>
              </div>
              <div className="form-col">
                <div className="form-field">
                  <label>HbA1C Level</label>
                  <input type="number" step="0.1" name="HbA1c_level" value={formData.HbA1c_level} onChange={handleChange} 
                  placeholder="HbA1C Level" required />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <div className="form-field">
                  <label>Blood Glucose Level</label>
                  <input type="number" name="blood_glucose_level" value={formData.blood_glucose_level} onChange={handleChange} 
                  placeholder="Blood Glucose Level" required />
                </div>
              </div>
            </div>
            <button type="submit">Predict</button>
          </form>
          {prediction !== null && (
            <div className="prediction-result">
              <h3>Prediction: {prediction === 1 ? 'Diabetes' : 'No Diabetes'}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

