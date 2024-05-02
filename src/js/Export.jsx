import React, { useState, useEffect } from 'react';
import metadataPath from './meta_2.json';
import axios from 'axios';
import '../css/Export.css';

const Export = ({ onClose }) => {
    const [selectedCube, setSelectedCube] = useState('');
    const [filters, setFilters] = useState([]);
    const [selectedFileType, setSelectedFileType] = useState('CSV');
    const [error, setError] = useState('');
  
    useEffect(() => {
      let cubes = metadataPath.cubes;
      let filters = [];
  
      const processHierarchies = (hierarchies) => {
        if (hierarchies && hierarchies.length > 0) {
          hierarchies.forEach((hierarchy) => {
            filters.push({ name: hierarchy.name, isHierarchy: true }); // Підвимір
            if (hierarchy.hierarchies && hierarchy.hierarchies.length > 0) {
              hierarchy.hierarchies.forEach((subHierarchy) => {
                filters.push({ name: subHierarchy.name, isSubHierarchy: true }); // Підпідвимір
              });
            }
          });
        }
      };
  
      if (selectedCube) {
        const cube = cubes.find((cube) => cube.name === selectedCube);
        if (cube) {
          cube.dimensions.forEach((dimension) => {
            filters.push({ name: dimension.name, isHierarchy: false }); // Основний вимір
            if (dimension.hierarchies && dimension.hierarchies.length > 0) {
              processHierarchies(dimension.hierarchies);
            }
          });
        }
      }
      console.log(filters);
      setFilters(filters);
    }, [selectedCube]);
  
    const handleFileTypeChange = (e) => {
      setSelectedFileType(e.target.value);
    };
  
    const handleCubeChange = (e) => {
      setSelectedCube(e.target.value);
    };
  
    const handleExport = async () => {
    
    };
  
    return (
      <div className="popup-container-export">
        <div className="popup-content">
          <span className="close-btn" onClick={onClose}>&times;</span>
          <h3>Export Data</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label>Select Cube:</label>
            <select value={selectedCube} onChange={handleCubeChange}>
              <option value="">Select Cube</option>
              {metadataPath.cubes.map((cube) => (
                <option key={cube.name} value={cube.name}>{cube.name}</option>
              ))}
            </select>
          </div>
          {/* Фільтри */}
          <div className="filters-container">
          {filters &&
              filters.map((filter, index) => (
              <div key={index} className={`filter-item ${filter.isHierarchy ? 'subdimension' : filter.isSubHierarchy ? 'subsubdimension' : ''}`}>
                  <input type="checkbox" defaultChecked="true" name={filter.name} value={filter.name} />
                  <label>{filter.name}</label>
              </div>
              ))}
          </div>
          <div>
            <label>Select File Type:</label>
            <select value={selectedFileType} onChange={handleFileTypeChange}>
              <option value="CSV">CSV</option>
              <option value="XML">XML</option>
              <option value="JSON">JSON</option>
            </select>
          </div>
          <button onClick={handleExport}>Export</button>
        </div>
      </div>
    );
  };
  
  export default Export;
  