import React, { useEffect, useState } from 'react';
import './App.css';

interface Doctor { id: number; user: { username: string; }; specialty: string; is_available: boolean; }
interface Patient { id: number; name: string; }
interface Appointment { id: number; doctor_name: string; date_time: string; status: string; }

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [dateTime, setDateTime] = useState("");

  // Initial Load
  useEffect(() => {
    fetch('/api/doctors/').then(res => res.json()).then(setDoctors);
    fetch('/api/patients/').then(res => res.json()).then(setPatients);
  }, []);

  // Fetch Appointments when Patient changes
  useEffect(() => {
    if (selectedPatient) {
      fetch(`/api/appointments/?patient=${selectedPatient}`)
        .then(res => res.json())
        .then(setAppointments);
    }
  }, [selectedPatient]);

  const handleBook = () => {
    if (!selectedDoctor || !selectedPatient || !dateTime) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      doctor: selectedDoctor,
      patient: selectedPatient,
      date_time: new Date(dateTime).toISOString(),
      status: 'pending'
    };

    fetch('/api/appointments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (res.ok) {
        alert("Appointment Booked!");
        setSelectedDoctor(null);
        // Refresh appointment list
        fetch(`/api/appointments/?patient=${selectedPatient}`)
          .then(res => res.json())
          .then(setAppointments);
      } else {
        res.json().then(err => alert("Error: " + JSON.stringify(err)));
      }
    });
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🏥 Appointment System</h1>
      
      {/* Patient Selector (Acts as Login) */}
      <div style={{ marginBottom: "20px", padding: "10px", background: "#eee", borderRadius: "5px" }}>
        <label><strong>Viewing as Patient: </strong></label>
        <select onChange={e => setSelectedPatient(e.target.value)} value={selectedPatient}>
          <option value="">-- Select Identity --</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Booking Form */}
      {selectedDoctor && (
        <div style={{ border: "2px solid #007bff", padding: "20px", marginBottom: "20px", borderRadius: "8px" }}>
          <h3>Booking for Doctor ID: {selectedDoctor}</h3>
          <label>Date & Time: </label>
          <input type="datetime-local" onChange={e => setDateTime(e.target.value)} />
          <br /><br />
          <button onClick={handleBook} style={{ background: "#007bff", color: "white", padding: "10px", border: "none" }}>
            Confirm Booking
          </button>
          <button onClick={() => setSelectedDoctor(null)} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
      )}

      {/* Doctor List */}
      <h2>Available Doctors</h2>
      <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {doctors.map((doc) => (
          <div key={doc.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h3>Dr. {doc.user.username}</h3>
            <p>{doc.specialty}</p>
            <button 
              onClick={() => {
                if(!selectedPatient) alert("Select a patient identity first!");
                else setSelectedDoctor(doc.id);
              }}
              disabled={!doc.is_available}
              style={{ cursor: "pointer", padding: "5px 10px" }}
            >
              {doc.is_available ? "Book Now" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>

      {/* My Appointments Section */}
      {selectedPatient && (
        <div style={{ marginTop: "40px", borderTop: "2px solid #333", paddingTop: "20px" }}>
          <h2>📅 My Appointments</h2>
          {appointments.length === 0 ? <p>No appointments found.</p> : (
            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#ddd" }}>
                  <th style={{ padding: "8px" }}>Doctor</th>
                  <th style={{ padding: "8px" }}>Date</th>
                  <th style={{ padding: "8px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(app => (
                  <tr key={app.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px" }}>Dr. {app.doctor_name}</td>
                    <td style={{ padding: "8px" }}>{new Date(app.date_time).toLocaleString()}</td>
                    <td style={{ padding: "8px" }}>{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
