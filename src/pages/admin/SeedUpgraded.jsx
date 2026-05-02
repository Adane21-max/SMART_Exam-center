import { useState } from 'react';
import api from '../../api/axios';

const SeedUpgraded = () => {
  const [status, setStatus] = useState('');

  const handleSeed = async () => {
    setStatus('Seeding...');
    try {
      const res = await api.get('/admin/seed-upgraded-students');
      setStatus(`Done! Affected rows: ${res.data.affectedRows}`);
    } catch (err) {
      setStatus(`Error: ${err.response?.data?.message || 'Failed'}`);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Temporary Seeding – Upgraded Students</h2>
      <p>
        This will add missing <code>student_subject_level</code> rows for all
        students with <code>current_level &gt; 1</code>.
      </p>
      <button onClick={handleSeed} style={{ padding: '10px 20px', fontSize: 16 }}>
        Seed Upgraded Students Now
      </button>
      {status && <p style={{ marginTop: 20, fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
};

export default SeedUpgraded;
