import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import metadataPath from "./meta_2.json";
import axios from "axios";
import "../css/Export.css";

const Export = ({ onClose }) => {
  const [selectedCube, setSelectedCube] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("CSV");
  const [dataDimentions, setDataDimentions] = useState();
  const [dataMeasures, setDataMeasures] = useState();

  // const [viewData, setViewData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const res = buildExportData();
    // setViewData(res);
    setDataDimentions(res);
  }, [selectedCube]);

  const handleFileTypeChange = (e) => {
    setSelectedFileType(e.target.value);
  };

  const handleCubeChange = (e) => {
    setSelectedCube(e.target.value);
  };

  const buildExportData = () => {
    if (selectedCube) {
      const cube = metadataPath.cubes.find((c) => c.name === selectedCube);
      if (!cube) return {};

      let exportData = {};
      cube.dimensions.forEach((dim) => {
        const dimensionData = dim.column.map((col) => ({
          name: col.name,
          checked: false,
        }));

        exportData[dim.name] = dimensionData;
      });

      setDataDimentions(exportData);
      console.log("data", dataDimentions);

      const measures = cube.measures.map((measure) => ({
        ...measure,
        checked: false,
      }));
      setDataMeasures(measures);
      console.log("dataMeasures", measures);

      return exportData;
    }
    return {};
  };

  function isArray(arr) {
    return !!arr?.length;
  }

  const handleExport = async () => {
    const noExportData = {};
    for (let key of Object.keys(dataDimentions)) {
      noExportData[key] = {};
      if (!isArray(dataDimentions[key])) {
        noExportData[key] = dataDimentions[key];
      } else {
        for (let elem of dataDimentions[key]) {
          noExportData[key][`${elem.name}`] = elem.checked;
        }
      }
    }

    for (let measure of dataMeasures) {
      noExportData[measure.name] = measure.checked;
    }
    console.log("Export Data", noExportData);

    let exportData = filterFalsyFields(noExportData);
    console.log("exportData", exportData);

    // // Код для експорту данних
    let type = "";
    if(selectedCube === "fact_sales_and_usage"){
      type = "ticket-sales"
    }
    else if(selectedCube === "fact_income_and_prime_cost_of_wagon"){
      type = "wagon-efficiency"
    }
    else if(selectedCube === "fact_sales_service"){
      type = "services-sales"
    }

    if (selectedFileType === "CSV") {
      try {
        await axios
          .post(`http://localhost:3030/${type}/export/csv`, exportData, {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "some_file_name.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
        // console.log("Server response", response.data);
      } catch (error) {
        console.error("Error during export", error.response || error.message);
      }
    }else if(selectedFileType == "JSON"){
      try {
        await axios
          .post(`http://localhost:3030/${type}/export/json`, exportData, {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "some_file_name.json");
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
      } catch (error) {
        console.error("Error during export", error.response || error.message);
      }
    }
    else if(selectedFileType == "XML"){
      try {
        await axios
          .post(`http://localhost:3030/${type}/export/xml`, exportData, {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "some_file_name.xml");
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
      } catch (error) {
        console.error("Error during export", error.response || error.message);
      }
    }
  };

  function filterObject(obj) {
    const result = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object') {
        const filteredSubObject = filterObject(value);
        if (Object.keys(filteredSubObject).length > 0) {
          result[key] = filteredSubObject;
        }
      } else if (value === true) {
        result[key] = value;
      }
    });
    return result;
  }
  
  function filterFalsyFields(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value === true || (typeof value === 'object' && Object.values(value).some(v => v === true))) {
            if (typeof value === 'object') {
                result[key] = filterFalsyFields(value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

  const updateCheckStatus = (section, index) => {
    const itemIndex = dataDimentions[section].findIndex(
      (item, i) => i === index
    );

    if (itemIndex !== -1) {
      // Create a new array with updated item
      const newData = [...dataDimentions[section]];
      newData[itemIndex] = {
        ...newData[itemIndex],
        checked: !newData[itemIndex].checked,
      };

      // Update the state
      setDataDimentions((prevData) => ({
        ...prevData,
        [section]: newData,
      }));
      console.log("data", dataDimentions);
    }
  };

  const updateMeasureStatus = (measure, measureIndex) => {
    setDataMeasures((prevData) => {
      const newDataMeasures = [...prevData];
      newDataMeasures[measureIndex] = {
        ...newDataMeasures[measureIndex],
        checked: !Boolean(newDataMeasures[measureIndex].checked),
      };
      return newDataMeasures;
    });
    console.log("data", dataMeasures);
  };

  return (
    <div className="popup-container-export">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h3>Export Data</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>Select Cube:</label>
          <select value={selectedCube} onChange={handleCubeChange}>
            <option value="">Select Cube</option>
            {metadataPath.cubes.map((cube) => (
              <option key={cube.name} value={cube.name}>
                {cube.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-container">
          {dataDimentions &&
            Object.keys(dataDimentions).map((dimension) => (
              <div className="" key={dimension}>
                <label>{dimension}</label>
                {Array.isArray(dataDimentions[dimension]) &&
                  dataDimentions[dimension].map((item, index) => (
                    <Checkbox
                      label={item.name}
                      isChecked={item.checked}
                      onChange={() => updateCheckStatus(dimension, index)}
                    />
                  ))}
              </div>
            ))}
          <div>
            {dataMeasures &&
              Object.keys(dataMeasures).map((measure, index) => (
                <>
                  <label>{dataMeasures[index].name}</label>
                  <Checkbox
                    label={measure.name}
                    isChecked={measure.checked}
                    onChange={() => updateMeasureStatus(measure, index)}
                  />
                </>
              ))}
          </div>
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
