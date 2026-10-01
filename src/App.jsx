import { useState } from "react";
import StudentRegistration from "./StudentRegistration";
import EligibilityChecker from "./EligibilityChecker";
import CollegeDetails from "./CollegeDetails";
import "./CollegeDetails.css";
import "./App.css";

export default function App() {
  const [step, setStep] = useState("register"); // 'register' | 'eligibility' | 'details'
  const [studentData, setStudentData] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [userCutoff, setUserCutoff] = useState(0);

  // Step 1 Completed -> Move to Step 2
  const handleRegistrationComplete = (data) => {
    setStudentData(data);
    setStep("eligibility");
  };

  // Step 2 Action -> Select a college card and move to Step 3
  const handleCollegeSelect = (college, cutoff) => {
    setSelectedCollege(college);
    setUserCutoff(cutoff);
    setStep("details");
  };

  return (
    <main className="app-main-wrapper">
      {step === "register" && (
        <StudentRegistration onRegisterSuccess={handleRegistrationComplete} />
      )}

      {(step === "eligibility" || step === "details") && (
        <EligibilityChecker
          studentData={studentData}
          onSelectCollege={handleCollegeSelect}
          onBack={() => setStep("register")}
          hidden={step !== "eligibility"}
        />
      )}

      {step === "details" && selectedCollege && (
        <CollegeDetails
          college={selectedCollege}
          cutoff={userCutoff}
          studentData={studentData}
          onBack={() => setStep("eligibility")}
        />
      )}
    </main>
  );
}
