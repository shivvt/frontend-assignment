import React, { useState, useEffect } from 'react';
import './App.css';

const TableWithPagination = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(projects.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container">
      <h2 className="title">Project Funding Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((project) => (
            <tr key={project.id}>
              <td>{project['s.no']}</td>
              <td>{project['percentage.funded']}%</td>
              <td>{project['amt.pledged']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
