import { useState, useEffect } from 'react';
import api from '../../api/axios';

const SeedUpgraded = () => {
  const [status, setStatus] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students?role=student'); // or your list endpoint
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to load students', err);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    setStatus('Syncing visibility for all students...');
    try {
      const res = await api.get('/admin/sync-student-visibility');
      setStatus(`✅ Done! Updated rows: ${res.data.updatedRows}`);
    } catch (err) {
      setStatus(`❌ Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🔄 Student Visibility Sync</h2>
      <p>
        This tool ensures every student can see all quizzes up to their current
        level. It will:
      </p>
      <ul>
        <li>Insert missing <code>student_subject_level</code> rows</li>
        <li>Update existing rows to match the student’s global <code>current_level</code></li>
      </ul>
      <button
        onClick={handleSync}
        disabled={loading}
        style={{
          padding: '14px 28px',
          fontSize: '16px',
          background: loading ? '#ccc' : '#2a5298',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Syncing…' : 'Sync All Students Now'}
      </button>
      {status && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '6px' }}>
          <strong>{status}</strong>
        </div>
      )}
      <hr />
      <h3>Current Students (sample)</h3>
      <ul>
        {students.slice(0, 20).map(s => (
          <li key={s.id}>{s.username} (Grade {s.grade}, Level {s.current_level})</li>
        ))}
      </ul>
    </div>
  );
};

export default SeedUpgraded;
