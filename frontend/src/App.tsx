import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    // We fetch from /api/... which Nginx routes to Django
    fetch('/api/test/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + Django + Nginx + Postgres</h1>
      <p>
        Backend says: <strong>{data ? data.message : "Loading..."}</strong>
      </p>
    </div>
  );
}

export default App;
