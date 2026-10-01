import { useState } from "react";
import heroImage from "./assets/hero.png";
import "./StudentRegistration.css";

export default function StudentRegistration({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    dob: "",
    department: "aiml",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const evaluate = (e) => {
    e.preventDefault();
    setError("");

    const { studentName, email, dob, department } = formData;

    if (!studentName.trim()) {
      setError("Please enter the student's name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!dob) {
      setError("Please select a date of birth.");
      return;
    }

    // Pass valid student data to App.jsx to proceed to step 2
    onRegisterSuccess({
      name: studentName.trim(),
      email: email.trim(),
      dob,
      department,
    });
  };

  return (
    <div className="registration-layout page-enter">
      <aside className="registration-visual" aria-hidden="true">
        <img className="registration-visual-image" src={heroImage} alt="" />
        <div className="registration-art-caption">
          <span>STUDENT ADMISSIONS</span>
          <h2>
            Find your place.
            <br />
            Shape what comes next.
          </h2>
          <p>
            01 <small>/ 03</small>
          </p>
        </div>
      </aside>

      <section className="auth-card" aria-labelledby="registration-title">
        <div className="registration-heading">
          <span className="registration-eyebrow">APPLICATION · STEP 01</span>
          <h1 className="portal-heading" id="registration-title">
            Create your profile
          </h1>
          <p className="portal-subheading">Student registration</p>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}

        <form
          id="studentRegister"
          className="registration-form"
          onSubmit={evaluate}
        >
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Full Name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Preferred Course</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="aiml">AIML</option>
              <option value="it">IT</option>
              <option value="cs">CS</option>
              <option value="mech">MECH</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary full-width">
            Continue to Eligibility Check →
          </button>
        </form>
      </section>
    </div>
  );
}
