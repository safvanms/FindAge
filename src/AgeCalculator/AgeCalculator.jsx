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

  const getMonthName = (monthNumber) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber];
  };

  const getDayWithSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }

    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const calculateAge = (date) => {
    const today = new Date();
    const notValidDate = new Date(date).getTime() > today.getTime();
    const enteredDate = new Date(date);
    const thisDay =
      enteredDate.getFullYear() === today.getFullYear() &&
      enteredDate.getMonth() === today.getMonth() &&
      enteredDate.getDate() === today.getDate();
    const isBirthday =
      enteredDate.getDate() === today.getDate() &&
      enteredDate.getMonth() === today.getMonth();

    if (!date) {
      setBirthDay(false);
      return setResult(`Enter a date first `);
    } else if (thisDay) {
      const thisDayWithSuffix = getDayWithSuffix(today.getDate());
      setResult(
        `${thisDayWithSuffix} ${getMonthName(
          today.getMonth()
        )} is today, isn't it?`
      );
      setBirthDay(false);
    } else if (!notValidDate) {
      let years = today.getFullYear() - enteredDate.getFullYear();
      let months = today.getMonth() - enteredDate.getMonth();
      let days = today.getDate() - enteredDate.getDate();

      if (days < 0) {
        months--;
        const lastMonthDays = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        ).getDate();
        days += lastMonthDays;
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      setResult(`Age is ${years} years, ${months} months, and ${days} days`);

      if (isBirthday && !thisDay) {
        setBirthDay(true);
      }

    } else {
      notValidDate && setResult(`Fool , it's a future date !`);
    }
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
      </div>
    </div>
  );
}
