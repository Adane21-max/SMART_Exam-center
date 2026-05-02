import { useState } from 'react';
import api from '../../api/axios';

const SeedUpgraded = () => {
  const [status, setStatus] = useState('');

  const handleSync = async () => {
    setStatus('Syncing…');
    try {
      const res = await api.get('/admin/sync-student-visibility');
      setStatus(`✅ Done! Updated rows: ${res.data.updatedRows}`);
    } catch (err) {
      setStatus(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔄 Student Visibility Sync</h2>
      <p>
        This utility ensures that every student can see all quizzes up to their
        current level. It will:
      </p>
      <ul>
        <li>Add missing <code>student_subject_level</code> rows</li>
        <li>Update existing rows to match the student’s global level</li>
      </ul>
      <button
        onClick={handleSync}
        style={{
          padding: '14px 28px',
          fontSize: '16px',
          background: '#2a5298',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Sync All Students Now
      </button>
      {status && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '6px' }}>
          <strong>{status}</strong>
        </div>
      )}
    </div>
  );
};

export default SeedUpgraded;
