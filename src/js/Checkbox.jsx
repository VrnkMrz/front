import React from "react";

const Checkbox = ({ isChecked, label, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <p>{label}</p>
    </div>
  );
};

export default Checkbox;
