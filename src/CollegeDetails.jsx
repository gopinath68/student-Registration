const formatFees = (fees) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(fees);

export default function CollegeDetails({
  college,
  cutoff,
  studentData,
  onBack,
}) {
  return (
    <article className="details-fullpage page-enter">
      <button className="btn btn-secondary back-floating-btn" onClick={onBack}>
        ← Back to colleges
      </button>

      <header className="banner-wrapper">
        <img className="hero-banner" src={college.image} alt="" />
        <div className="banner-text-overlay">
          <span className="type-badge-large">{college.type}</span>
          <h1 className="hero-name">{college.name}</h1>
          <p className="hero-city">{college.location}</p>
        </div>
      </header>

      <div className="details-body">
        <section
          className="metrics-grid"
          aria-label="College and eligibility details"
        >
          <div className="metric-box highlighted">
            <span className="m-label">Your cut-off score</span>
            <span className="m-value">{cutoff} / 200</span>
          </div>
          <div className="metric-box">
            <span className="m-label">College cut-off</span>
            <span className="m-value">{college.cutoff}</span>
          </div>
          <div className="metric-box">
            <span className="m-label">Annual tuition fee</span>
            <span className="m-value">{formatFees(college.fees)}</span>
          </div>
          <div className="metric-box">
            <span className="m-label">Student</span>
            <span className="m-value">{studentData?.name}</span>
          </div>
          <div className="metric-box">
            <span className="m-label">Student rating</span>
            <span className="m-value">{college.rating} / 5</span>
          </div>
        </section>

        <section className="courses-section">
          <h2>Popular courses</h2>
          <div className="courses-tags">
            {college.courses.map((course) => (
              <span className="course-chip" key={course}>
                {course}
              </span>
            ))}
          </div>
        </section>

        <footer className="apply-action-box">
          <div>
            <h3>Compare your options</h3>
            <p>Your score meets this college's listed cut-off.</p>
          </div>
          <button className="btn btn-primary btn-apply" onClick={onBack}>
            Back to colleges
          </button>
        </footer>
      </div>
    </article>
  );
}
