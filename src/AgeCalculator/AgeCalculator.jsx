import React, { useState } from "react";
import "./ageCalculator.css";

export default function AgeCalculator() {
  const [formData, setFormData] = useState({
    date: "",
  });
  const [result, setResult] = useState(null);
  const [birthDay, setBirthDay] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateAge(formData.date);
    setFormData({ date: "" });
  };

  const calculateAge = (date) => {
    const today = new Date();
    const notValidDate = new Date(date).getTime() > today.getTime();
    if (!date) {
      setBirthDay(false);
      return setResult(`Enter a date first `);
    } else if (!notValidDate) {
      const birthDate = new Date(date);

      const ageInMilliseconds = today - birthDate;
      const ageInSeconds = ageInMilliseconds / 1000;
      const ageInMinutes = ageInSeconds / 60;
      const ageInHours = ageInMinutes / 60;
      const ageInDays = ageInHours / 24;

      const years = Math.floor(ageInDays / 365);
      const months = Math.floor((ageInDays % 365) / 30);
      const days = Math.floor(ageInDays % 30);

      setResult(`Age is ${years} years, ${months} months, and ${days} days`);

      const isBirthday =
        birthDate.getDate() === today.getDate() &&
        birthDate.getMonth() === today.getMonth();

      setBirthDay(isBirthday);
    }
    notValidDate && setResult(`Fool , it's a future date !`);
  };

  return (
    <div className="date_container">
      <h1 className="heading">How Old Are you ?</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
        <label htmlFor="date">Enter age here:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="MM-DD-YYYY"
            id="date"
          />
          <button type="submit">
            {!formData.date ? "Enter date" : "Check it"}
          </button>
        </form>
        {birthDay && result && <h1 className="bDay">Happy Birthday !</h1>}
        {result && <p className="result"> {result} </p>}
        {result && (
          <p className="info">
            Please note that the exact number of days may vary slightly due to
            the impact of leap years.
          </p>
        )}
      </div>
    </div>
  );
}
