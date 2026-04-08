import { useState, useEffect } from "react";

const questions = [
  {
    question: "What is React?",
    options: ["Library", "Framework", "Language"],
    answer: "Library",
  },
  {
    question: "Which hook is used for state?",
    options: ["useState", "useEffect", "useRef"],
    answer: "useState",
  },
  {
    question: "What is JSX?",
    options: ["JavaScript XML", "JSON", "HTML only"],
    answer: "JavaScript XML",
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft"],
    answer: "Facebook",
  },
  {
    question: "What is useEffect used for?",
    options: ["Styling", "Side Effects", "Routing"],
    answer: "Side Effects",
  },
  {
    question: "What is a component?",
    options: ["Function/Block", "Database", "API"],
    answer: "Function/Block",
  },
];

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    regNo: "",
    dept: "",
  });
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(60);

  // ⏱ Timer
  useEffect(() => {
    if (page !== "quiz") return;

    if (time === 0) {
      setPage("result");
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, page]);

  const handleStart = () => {
    if (!user.name || !user.email || !user.phone || !user.regNo || !user.dept) {
      alert("Please fill all details");
      return;
    }
    setPage("quiz");
  };

  const handleAnswer = (ans) => {
    const newAns = [...answers, ans];
    setAnswers(newAns);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setPage("result");
    }
  };

  // 📊 Score
  let score = 0;
  answers.forEach((a, i) => {
    if (a === questions[i].answer) score++;
  });

  const percentage = Math.round((score / questions.length) * 100);

  let grade = "C";
  if (percentage >= 80) grade = "A";
  else if (percentage >= 50) grade = "B";

  let message = "Keep practicing 💪";
  let rank = "Beginner";

  if (percentage >= 80) {
    message = "Outstanding Performance 🎉🔥";
    rank = "Top Performer 🏆";
  } else if (percentage >= 50) {
    message = "Good Job 👏";
    rank = "Intermediate ⭐";
  }

  const pass = percentage >= 50 ? "PASS ✅" : "FAIL ❌";

  // 🎨 Styles
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI",
  };

  const card = {
    width: "450px",
    padding: "30px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  };

  const input = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const button = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2a5298",
    color: "#fff",
    cursor: "pointer",
  };

  const optionBtn = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #2a5298",
    background: "#f4f7ff",
    cursor: "pointer",
  };

  const progress = (index / questions.length) * 100;

  // LOGIN
  if (page === "login") {
    return (
      <div style={pageStyle}>
        <div style={card}>
          <h2 style={{ color: "#2a5298" }}>Online Exam Portal</h2>

          <input style={input} placeholder="Full Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })} />

          <input style={input} placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })} />

          <input style={input} placeholder="Phone Number"
            onChange={(e) => setUser({ ...user, phone: e.target.value })} />

          <input style={input} placeholder="Register Number"
            onChange={(e) => setUser({ ...user, regNo: e.target.value })} />

          <input style={input} placeholder="Department"
            onChange={(e) => setUser({ ...user, dept: e.target.value })} />

          <button style={button} onClick={handleStart}>
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  // QUIZ
  if (page === "quiz") {
    return (
      <div style={pageStyle}>
        <div style={card}>
          <h4>⏱ {time}s</h4>

          <div style={{ background: "#eee", borderRadius: "10px" }}>
            <div style={{
              width: `${progress}%`,
              background: "#2a5298",
              height: "8px",
              borderRadius: "10px",
            }} />
          </div>

          <h4>Question {index + 1} / {questions.length}</h4>
          <h3>{questions[index].question}</h3>

          {questions[index].options.map((opt, i) => (
            <button key={i} style={optionBtn} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // RESULT
  return (
    <div style={pageStyle}>
      <div style={card}>
        <h2 style={{ color: "#2a5298" }}>🎓 Final Report</h2>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Reg No:</strong> {user.regNo}</p>
        <p><strong>Dept:</strong> {user.dept}</p>

        <h3>{pass}</h3>
        <h3>Score: {score}/{questions.length}</h3>
        <h3>Percentage: {percentage}%</h3>
        <h3>Grade: {grade}</h3>
        <h3>{rank}</h3>

        <h2 style={{ color: "#2a5298" }}>{message}</h2>

        <hr />

        {questions.map((q, i) => {
          const correct = answers[i] === q.answer;
          return (
            <div key={i} style={{ textAlign: "left" }}>
              <p><strong>{q.question}</strong></p>
              <p>Your: {answers[i]}</p>
              <p>Correct: {q.answer}</p>
              <p style={{ color: correct ? "green" : "red" }}>
                {correct ? "✔ Correct" : "✘ Wrong"}
              </p>
            </div>
          );
        })}

        <button style={button} onClick={() => window.location.reload()}>
          Restart Exam
        </button>

        <button
          style={{ ...button, background: "#555" }}
          onClick={() => setPage("login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
