import { useState } from "react";
import collegeData from "./jsonData/collegeData.json";
import "./EligibilityChecker.css";

export default function EligibilityChecker({
  studentData,
  onSelectCollege,
  onBack,
  hidden = false,
}) {
  const [marks, setMarks] = useState({ maths: "", physics: "", chemistry: "" });
  const [userCutoff, setUserCutoff] = useState(null);
  const [eligibleColleges, setEligibleColleges] = useState([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleMarkChange = (e) => {
    const { name, value } = e.target;
    setMarks((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
    setErrorMsg("");
    setUserCutoff(null);
    setEligibleColleges([]);
    setHasCalculated(false);
  };

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { maths, physics, chemistry } = marks;

    if (maths === "" || physics === "" || chemistry === "") {
      setErrorMsg("Please provide all three subject marks.");
      return;
    }

    const subjectMarks = [maths, physics, chemistry];

    if (subjectMarks.some((mark) => mark < 45)) {
      setErrorMsg("Minimum mark of 45 is required in each subject.");
      return;
    }

    if (subjectMarks.some((mark) => mark > 100)) {
      setErrorMsg("Marks cannot exceed 100 in any subject.");
      return;
    }

    // Standard Tamil Nadu engineering cutoff formula: Maths + (Physics / 2) + (Chemistry / 2)
    const cutoff = Number(maths) + Number(physics) / 2 + Number(chemistry) / 2;
    setUserCutoff(cutoff);

    // Filter colleges where student cutoff meets or exceeds the required cutoff
    const filtered = collegeData.filter((col) => cutoff >= col.cutoff);
    setEligibleColleges(filtered);
    setHasCalculated(true);
  };

  return (
    <div className="checker-page-container page-enter" hidden={hidden}>
      <header className="page-header">
        <div>
          <h2>Step 2: Eligibility & Matching Colleges</h2>
          <p className="welcome-text">
            Applicant: <strong>{studentData?.name}</strong> (
            {studentData?.email})
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to Register
        </button>
      </header>

      {/* Marks Calculation Box */}
      <div className="marks-calc-card">
        <h3>Enter 12th Board Marks (PCM)</h3>
        {errorMsg && (
          <div className="error-banner" role="alert">
            {errorMsg}
          </div>
        )}

        <form noValidate onSubmit={handleCheckEligibility}>
          <div className="marks-input-row">
            <div className="form-group">
              <label htmlFor="maths">Maths (/100)</label>
              <input
                type="number"
                id="maths"
                name="maths"
                min="45"
                max="100"
                placeholder="0"
                value={marks.maths}
                onChange={handleMarkChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="physics">Physics (/100)</label>
              <input
                type="number"
                id="physics"
                name="physics"
                min="45"
                max="100"
                placeholder="0"
                value={marks.physics}
                onChange={handleMarkChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="chemistry">Chemistry (/100)</label>
              <input
                type="number"
                id="chemistry"
                name="chemistry"
                min="45"
                max="100"
                placeholder="0"
                value={marks.chemistry}
                onChange={handleMarkChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Compute Cut-off & Show Colleges
          </button>
        </form>

        {userCutoff !== null && (
          <div className="cutoff-badge-box">
            Your Cut-off Score: <strong>{userCutoff} / 200</strong>
          </div>
        )}
      </div>

      {/* Results Section */}
      {hasCalculated && (
        <section className="results-section result-enter">
          <h3>Eligible Campuses ({eligibleColleges.length} Found)</h3>

          {eligibleColleges.length === 0 ? (
            <div className="no-colleges">
              <p>No institutions match your cut-off score of {userCutoff}.</p>
            </div>
          ) : (
            <div className="college-cards-grid">
              {eligibleColleges.map((col, index) => (
                <article
                  key={col.id}
                  className="college-summary-card"
                  style={{ "--card-index": Math.min(index, 8) }}
                >
                  <img
                    src={col.image}
                    alt={col.name}
                    className="card-preview-img"
                  />
                  <div className="card-content">
                    <span className="type-badge">{col.type}</span>
                    <h4 className="college-title">{col.name}</h4>
                    <p className="college-location">📍 {col.location}</p>

                    <div className="meta-footer">
                      <span>
                        Cut-off: <strong>{col.cutoff}</strong>
                      </span>
                      <span>⭐ {col.rating}</span>
                    </div>

                    <button
                      className="btn btn-view"
                      type="button"
                      onClick={() => onSelectCollege(col, userCutoff)}
                    >
                      View Full Details →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
