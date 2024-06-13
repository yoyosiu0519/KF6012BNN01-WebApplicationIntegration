import React from 'react';
/**
 * Search Content Type component
 * 
 * This handles the selection of content type in the content.
 * 
 * @author Pik Sum Siu
 */

const SearchContentType = ({ selectType, handleSelectType }) => {
  return (
    <select value={selectType} onChange={handleSelectType} className='p-1 mx-4 rounded-md float-none text-black'>
      <option value="">All</option>
      <option value="Course">Course</option>
      <option value="Demo">Demo</option>
      <option value="Doctoral Consortium">Doctoral Consortium</option>
      <option value="Event">Event</option>
      <option value="Late-Breaking Work">Late-Breaking Work</option>
      <option value="Paper">Paper</option>
      <option value="Work-in-Progress">Work-in-Progress</option>
      <option value="Workshop">Workshop</option>
      <option value="Case Study">Case Study</option>
      <option value="Panel">Panel</option>
      <option value="AltCHI">AltCHI</option>
      <option value="SIG">SIG</option>
      <option value="Keynote">Keynote</option>
      <option value="Interactivity">Interactivity</option>
      <option value="Journal">Journal</option>
      <option value="Symposia">Symposia</option>
      <option value="Competitions">Competitions</option>
    </select>
  );
};

export default SearchContentType;