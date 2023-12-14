import React from "react";

const Dropdown = ({value, changeValue, options}) => {

  const handleChange = (event) => {
    changeValue( event.target.value );
  };

  return (
    <div>
      <select value={value} onChange={handleChange}>
        {options.map( option => <option value={option.name}>{option.name}</option>)}
      </select>
      {/* <p>Selected value: {state.dropdownValue}</p> */}
    </div>
  );
};

export default Dropdown;