
const WEB3FORMS_KEY = "5ce84b28-41c3-4979-973d-b9fd6df8041c";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
async function analyseWithClaude(form) {
  try {
    const res = await fetch(`${API}/analyse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log("Claude Response:", data);

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export default function Resume() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Track "opened"
  
  const handleSend = async () => {

  try {

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,

        name: form.name,
        company: form.company,
        email: form.email,
        message: form.message,

        subject: "New Portfolio Hire Me Request",

      })
    });


    const result = await response.json();

    console.log(result);


    if (result.success) {

      setSent(true);

      setTimeout(() => {

        setShowModal(false);
        setSent(false);
        setStep(1);

        setForm({
          name: "",
          company: "",
          email: "",
          message: ""
        });

      }, 3000);

    }

  } catch(error) {

    console.error(error);

  }

};
const resetModal = () => {

  setShowModal(false);
  setSent(false);
  setStep(1);

  setForm({
    name: "",
    company: "",
    email: "",
    message: ""
  });

};
  
  
  const canNext1 = form.name.trim() && form.email.trim();
  const canNext2 = form.message.trim();
  const steps = ["Who are you?", "Your message", "Confirm & send"];

  return (
    <div className="cv-container">

      

      {/* FLOATING PULSE HIRE ME BUTTON */}
      <div onClick={() => setShowModal(true)} style={{
        position: "fixed", bottom: "36px", right: "36px",
        zIndex: 999, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          position: "absolute", width: "70px", height: "70px", borderRadius: "50%",
          background: "rgba(99,102,241,0.2)", animation: "pulse-ring 2s ease-out infinite",
        }} />
        <span style={{
          position: "absolute", width: "70px", height: "70px", borderRadius: "50%",
          background: "rgba(99,102,241,0.15)", animation: "pulse-ring 2s ease-out infinite 0.5s",
        }} />
        <div
          style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            boxShadow: "0 0 20px rgba(99,102,241,0.6), 0 4px 20px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "2px", userSelect: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(99,102,241,0.9), 0 4px 24px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.6), 0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          <span style={{ fontSize: "20px", lineHeight: 1 }}>✉️</span>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#fff", letterSpacing: "0.05em", fontFamily: "Inter, sans-serif" }}>HIRE ME</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(8,12,24,0.88);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 20px;
        }
        .modal-card {
          background: #0f1629; border: 1px solid rgba(99,102,241,0.35);
          border-radius: 20px; padding: 36px 32px;
          width: 100%; max-width: 460px; position: relative;
          box-shadow: 0 0 40px rgba(99,102,241,0.12), 0 24px 64px rgba(0,0,0,0.6);
          animation: slide-up 0.3s ease;
        }
        .wizard-progress {
          display: flex; align-items: center; justify-content: center;
          gap: 0; margin-bottom: 32px;
        }
        .wizard-step-item { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
        .wizard-step-circle {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;
          border: 2px solid #1e2a4a; color: #8892b0; background: #161d35;
          transition: all 0.3s; position: relative; z-index: 1;
        }
        .wizard-step-circle.active {
          border-color: #6366f1; background: linear-gradient(135deg, #6366f1, #818cf8);
          color: #fff; box-shadow: 0 0 16px rgba(99,102,241,0.5);
        }
        .wizard-step-circle.done { border-color: #34d399; background: rgba(52,211,153,0.15); color: #34d399; }
        .wizard-step-label {
          font-size: 10px; color: #8892b0; font-weight: 500;
          letter-spacing: 0.05em; text-transform: uppercase; text-align: center; white-space: nowrap;
        }
        .wizard-step-label.active { color: #818cf8; }
        .wizard-step-label.done { color: #34d399; }
        .wizard-connector { height: 2px; flex: 1; background: #1e2a4a; margin-bottom: 22px; transition: background 0.3s; }
        .wizard-connector.done { background: #34d399; }
        .wizard-body { animation: fade-in 0.3s ease; }
        .wizard-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700; color: #f0f4ff; margin-bottom: 6px; }
        .wizard-sub { font-size: 0.85rem; color: #8892b0; margin-bottom: 20px; }
        .wizard-field { margin-bottom: 14px; }
        .wizard-field label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8892b0; margin-bottom: 6px; }
        .wizard-field input, .wizard-field textarea {
          width: 100%; padding: 12px 14px; background: #161d35; border: 1px solid #1e2a4a;
          border-radius: 10px; color: #f0f4ff; font-size: 0.9rem; font-family: 'Inter', sans-serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; resize: vertical;
        }
        .wizard-field input:focus, .wizard-field textarea:focus {
          border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .wizard-field input::placeholder, .wizard-field textarea::placeholder { color: #8892b0; }
        .confirm-card {
          background: #161d35; border: 1px solid #1e2a4a; border-radius: 12px;
          padding: 18px 20px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 10px;
        }
        .confirm-row { display: flex; gap: 10px; font-size: 0.88rem; }
        .confirm-label { color: #8892b0; width: 72px; flex-shrink: 0; font-weight: 500; }
        .confirm-value { color: #f0f4ff; }
        .confirm-divider { border: none; border-top: 1px solid #1e2a4a; }
        .wizard-actions { display: flex; gap: 10px; margin-top: 4px; }
        .btn-primary {
          flex: 1; padding: 12px; background: linear-gradient(135deg, #6366f1, #818cf8);
          color: #fff; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 16px rgba(99,102,241,0.35);
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
        .btn-back {
          padding: 12px 18px; background: transparent; border: 1px solid #1e2a4a;
          color: #8892b0; border-radius: 10px; font-size: 0.9rem; font-weight: 500;
          font-family: 'Inter', sans-serif; cursor: pointer; transition: background 0.2s, color 0.2s; width: auto;
        }
        .btn-back:hover { background: rgba(255,255,255,0.05); color: #f0f4ff; transform: none; }
        .btn-copy {
          padding: 10px 14px; background: transparent; border: 1px solid #1e2a4a;
          color: #8892b0; border-radius: 10px; font-size: 0.82rem; font-weight: 500;
          font-family: 'Inter', sans-serif; cursor: pointer; transition: background 0.2s; width: auto;
        }
        .btn-copy:hover { background: rgba(99,102,241,0.1); color: #f0f4ff; transform: none; }
        .modal-close {
          position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.06);
          border: none; color: #8892b0; width: 30px; height: 30px; border-radius: 50%;
          font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(255,255,255,0.12); transform: none; }
        .modal-success { text-align: center; padding: 24px 0; }
        .modal-success h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; color: #f0f4ff; margin-top: 14px; }
        .modal-success p { color: #8892b0; font-size: 0.85rem; margin-top: 6px; }
        .toast { font-size: 0.8rem; color: #34d399; margin-top: 6px; text-align: center; }
        .modal-direct { text-align: center; font-size: 0.82rem; color: #8892b0; margin-top: 10px; }
        .modal-direct a { color: #818cf8; text-decoration: none; }
        .modal-direct a:hover { text-decoration: underline; }
      `}</style>

      {/* HEADER */}
      <div className="cv-header">
        <img src="/Nofi.jpeg" alt="Profile" className="profile-img" />
        <h1>MUDAU NAFTALI DAKALO</h1>
        
        <p>+27 60 815 8836 | mudaunaftali@gmail.com</p>
      </div>

      <section>
        <h2>Professional Summary</h2>
        <p>
          Aspiring Computer Science and Mathematics (BSC) Graduate with experience in
          Information and Communication Technology skills including Microsoft Office
          (Word, PowerPoint, Excel, Outlook, and Microsoft Azure), technical computing in
          HTML, SQL, C++, JAVA, PHP and PYTHON. Strong understanding of machine learning
          algorithms including supervised, unsupervised, and reinforcement learning.
          High levels of accuracy with attention to detail. Proactive, fast learner and constantly willing to grow.
        </p>
      </section>

      <section>
        <h2>Education</h2>
        <p><strong>University of Venda</strong></p>
        <p>BSc Computer Science and Mathematics</p>
        <p>Completed: 20 May 2026</p>
        <br />
        <p><strong>Tshidimbini Secondary School</strong></p>
        <p>Matric (Grade 12)</p>
        <p>Completed: 2022</p>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <p><strong>Programming Languages:</strong> JAVA, C#, C++, JavaScript, Python, PHP, Linux</p>
        <p><strong>Databases:</strong> MySQL, MS SQL Server, DBMS, MariaDB</p>
        <p><strong>Project Management:</strong> Agile Methodology</p>
        <p><strong>Tools:</strong> GitLab, JIRA, Confluence</p>
        <p><strong>IDEs:</strong> Visual Studio, NetBeans, Eclipse</p>
      </section>

      <section>
        <h2>Professional Skills & Personal Attributes</h2>
        <ul>
          <li>Machine Learning and Data Analysis</li>
          <li>Website Designing</li>
          <li>Database Administration</li>
          <li>Business and System Analysis</li>
          <li>Project Management and Fault-finding</li>
          <li>Excellent verbal and written communication skills</li>
          <li>Highly motivated, energetic, sound judgment, and good reasoning abilities</li>
        </ul>
      </section>

      <section>
        <h2>Work Experience</h2>
        <p><strong>Mathematics Tutor (Grades 10, 11 & 12)</strong> — Final Solutions, Vondwe</p>
        <p>Jan 2025 – Dec 2025</p>
        <ul>
          <li>Delivered targeted lessons for Grades 10, 11 & 12, improving pass rates.</li>
          <li>Designed customised study materials and assessments aligned to CAPS curriculum.</li>
          <li>Tracked learner progress and maintained scheduling and reporting records.</li>
        </ul>
      </section>

      <section>
        <h2>References</h2>
        <p><strong>Neguyuni Vusani</strong></p>
        <p>Final Solutions</p>
        <p>📞 076 290 7512</p>
      </section>

      {/* WIZARD MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={resetModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={resetModal}>✕</button>

            {sent ? (
              <div className="modal-success">
                <div style={{ fontSize: "52px" }}>📬</div>
                <h3>You're all set!</h3>
                <p>Your message has been sent successfully.</p>
              </div>
            ) : (
              <>
                <div className="wizard-progress">
                  {steps.map((label, i) => {
                    const num = i + 1;
                    const isActive = step === num;
                    const isDone = step > num;
                    return (
                      <>
                        <div className="wizard-step-item" key={num}>
                          <div className={`wizard-step-circle ${isActive ? "active" : isDone ? "done" : ""}`}>
                            {isDone ? "✓" : num}
                          </div>
                          <span className={`wizard-step-label ${isActive ? "active" : isDone ? "done" : ""}`}>
                            {label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`wizard-connector ${step > num ? "done" : ""}`} key={`c${i}`} />
                        )}
                      </>
                    );
                  })}
                </div>

                {step === 1 && (
                  <div className="wizard-body">
                    <div className="wizard-title">👋 Who are you?</div>
                    <div className="wizard-sub">Let Naftali know who's reaching out.</div>
                    <div className="wizard-field">
                      <label>Full Name *</label>
                      <input placeholder="e.g. Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} autoFocus />
                    </div>
                    <div className="wizard-field">
                      <label>Company</label>
                      <input placeholder="Optional" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                    </div>
                    <div className="wizard-field">
                      <label>Your Email *</label>
                      <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="wizard-actions">
                      <button className="btn-primary" disabled={!canNext1} onClick={() => setStep(2)}>Next →</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="wizard-body">
                    <div className="wizard-title">💬 Your message</div>
                    <div className="wizard-sub">Tell Naftali about the role or opportunity.</div>
                    <div className="wizard-field">
                      <label>Message *</label>
                      <textarea rows={5} placeholder="Hi Naftali, I'd love to discuss..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} autoFocus />
                    </div>
                    <div className="wizard-actions">
                      <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
                      <button className="btn-primary" disabled={!canNext2} onClick={() => setStep(3)}>Review →</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="wizard-body">
                    <div className="wizard-title">✅ Looks good?</div>
                    <div className="wizard-sub">Review your details before sending.</div>
                    <div className="confirm-card">
                      <div className="confirm-row">
                        <span className="confirm-label">Name</span>
                        <span className="confirm-value">{form.name}</span>
                      </div>
                      {form.company && (
                        <div className="confirm-row">
                          <span className="confirm-label">Company</span>
                          <span className="confirm-value">{form.company}</span>
                        </div>
                      )}
                      <div className="confirm-row">
                        <span className="confirm-label">Email</span>
                        <span className="confirm-value">{form.email}</span>
                      </div>
                      <hr className="confirm-divider" />
                      <div className="confirm-row">
                        <span className="confirm-label">Message</span>
                        <span className="confirm-value">{form.message}</span>
                      </div>
                    </div>
                    <div className="wizard-actions">
                      <button className="btn-back" onClick={() => setStep(2)}>← Edit</button>
                      <button className="btn-primary" onClick={handleSend}>Send ✉️</button>
                     
                    </div>
                    {copied && <p className="toast">✓ Email address copied to clipboard</p>}
                    
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}