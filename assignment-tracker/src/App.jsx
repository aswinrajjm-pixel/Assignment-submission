import React, { useState } from 'react';

const INITIAL_ASSIGNMENTS = [
  { id: 1, title: "Database Normalization", subject: "Computer Science", dueDate: "2026-06-28", status: "Submitted" },
  { id: 2, title: "Linear Algebra Problem Set 3", subject: "Mathematics", dueDate: "2026-07-01", status: "Pending" },
  { id: 3, title: "Neural Networks Essay", subject: "Data Science", dueDate: "2026-06-20", status: "Late" }
];

export default function App() {
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [filterSubject, setFilterSubject] = useState('All');
  
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  const total = assignments.length;
  const submitted = assignments.filter(a => a.status === 'Submitted').length;
  const pending = assignments.filter(a => a.status === 'Pending').length;
  const late = assignments.filter(a => a.status === 'Late').length;

  const uniqueSubjects = ['All', ...new Set(assignments.map(a => a.subject))];

  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!title || !subject || !dueDate) return alert("Please fill out all fields");

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: 'Pending'
    };

    setAssignments([...assignments, newAssignment]);
    setTitle('');
    setSubject('');
    setDueDate('');
  };

  const handleStatusChange = (id, newStatus) => {
    setAssignments(assignments.map(ast => 
      ast.id === id ? { ...ast, status: newStatus } : ast
    ));
  };

  const filteredAssignments = filterSubject === 'All' 
    ? assignments 
    : assignments.filter(a => a.subject === filterSubject);

  // Status Badge Color Utility
  const getBadgeStyle = (status) => {
    const base = { padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' };
    if (status === 'Submitted') return { ...base, backgroundColor: '#e2fbe8', color: '#1e7e34' };
    if (status === 'Pending') return { ...base, backgroundColor: '#fff3cd', color: '#856404' };
    return { ...base, backgroundColor: '#f8d7da', color: '#721c24' };
  };

  const styles = {
    // Force a crisp vibrant white dashboard overlay
    pageWrapper: {
      backgroundColor: '#f4f6f9',
      minHeight: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      color: '#333',
      paddingBottom: '40px'
    },
    navbar: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    container: { 
      maxWidth: '1100px', 
      margin: '30px auto', 
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    headerText: { margin: 0, fontSize: '24px', fontWeight: '700', color: '#1a365d' },
    subText: { margin: '2px 0 0 0', color: '#718096', fontSize: '14px' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '35px', marginTop: '10px' },
    card: { 
      padding: '20px', 
      borderRadius: '10px', 
      textAlign: 'center', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
      border: '1px solid #edf2f7'
    },
    sectionTitle: { fontSize: '18px', fontWeight: '600', color: '#2d3748', marginBottom: '15px' },
    form: { 
      display: 'flex', 
      gap: '12px', 
      marginBottom: '35px', 
      flexWrap: 'wrap', 
      background: '#f8fafc', 
      padding: '20px', 
      borderRadius: '10px',
      border: '1px solid #e2e8f0'
    },
    input: { 
      padding: '10px 14px', 
      borderRadius: '6px', 
      border: '1px solid #cbd5e0', 
      flex: 1, 
      minWidth: '180px',
      fontSize: '14px',
      backgroundColor: '#ffffff',
      color: '#333'
    },
    button: { 
      padding: '10px 20px', 
      background: '#3182ce', 
      color: 'white', 
      border: 'none', 
      borderRadius: '6px', 
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'background 0.2s'
    },
    filterSection: { marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '10px' },
    th: { background: '#f7fafc', padding: '14px', borderBottom: '2px solid #e2e8f0', color: '#4a5568', fontWeight: '600', fontSize: '14px' },
    td: { padding: '14px', borderBottom: '1px solid #edf2f7', fontSize: '15px', color: '#2d3748' },
    select: { 
      padding: '6px 10px', 
      borderRadius: '6px', 
      border: '1px solid #cbd5e0',
      backgroundColor: '#ffffff',
      color: '#333',
      cursor: 'pointer',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* --- CAMPUS PORTAL BANNER --- */}
      <div style={styles.navbar}>
        <div>
          <h1 style={styles.headerText}>Apex Institute of Technology</h1>
          <p style={styles.subText}>Faculty Assignment Submission Dashboard</p>
        </div>
      </div>

      <div style={styles.container}>
        {/* --- SUMMARY METRICS --- */}
        <div style={styles.summaryGrid}>
          <div style={{ ...styles.card, backgroundColor: '#f8fafc', borderLeft: '5px solid #64748b' }}>
            <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#334155' }}>{total}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Total Assignments</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: '#f0fdf4', borderLeft: '5px solid #16a34a' }}>
            <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#16a34a' }}>{submitted}</h3>
            <p style={{ margin: 0, color: '#16a34a', fontSize: '14px', fontWeight: '500' }}>Submitted</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: '#fffbeb', borderLeft: '5px solid #d97706' }}>
            <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#d97706' }}>{pending}</h3>
            <p style={{ margin: 0, color: '#d97706', fontSize: '14px', fontWeight: '500' }}>Pending</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: '#fef2f2', borderLeft: '5px solid #dc2626' }}>
            <h3 style={{ fontSize: '28px', margin: '0 0 5px 0', color: '#dc2626' }}>{late}</h3>
            <p style={{ margin: 0, color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>Late</p>
          </div>
        </div>

        {/* --- ADD NEW ASSIGNMENT --- */}
        <h2 style={styles.sectionTitle}>Create New Assignment Record</h2>
        <form onSubmit={handleAddAssignment} style={styles.form}>
          <input style={styles.input} type="text" placeholder="e.g., Database Normalization" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input style={styles.input} type="text" placeholder="e.g., Computer Science" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <input style={styles.input} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button type="submit" style={styles.button}>Add Assignment</button>
        </form>

        {/* --- FILTER CONTROL --- */}
        <div style={styles.filterSection}>
          <label htmlFor="subject-filter" style={{ fontSize: '15px', color: '#4a5568' }}><strong>Filter List by Subject:</strong></label>
          <select id="subject-filter" style={styles.select} value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
            {uniqueSubjects.map(subj => <option key={subj} value={subj}>{subj}</option>)}
          </select>
        </div>

        {/* --- TABULAR OVERVIEW --- */}
        {filteredAssignments.length === 0 ? (
          <p style={{ color: '#718096', textAlign: 'center', padding: '20px' }}>No active records found matching the criteria.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Assignment Title</th>
                <th style={styles.th}>Subject</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Current Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{assignment.title}</td>
                  <td style={styles.td}>{assignment.subject}</td>
                  <td style={styles.td}>{assignment.dueDate}</td>
                  <td style={styles.td}>
                    <span style={getBadgeStyle(assignment.status)}>{assignment.status}</span>
                  </td>
                  <td style={styles.td}>
                    <select style={styles.select} value={assignment.status} onChange={(e) => handleStatusChange(assignment.id, e.target.value)}>
                      <option value="Pending">Pending</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}