import React, { useState } from 'react';

const InteractiveComponent = () => {
  // State to store JSON data
  const [jsonData, setJsonData] = useState([]);
  // State to store the selected JSON item ID
  const [selectedItemId, setSelectedItemId] = useState(null);
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // Function to fetch JSON data
  const fetchData = async () => {
    try {
      const response = await fetch('path/to/your/json/file.json');
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data');
      }
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle button click
  const handleClick = () => {
    setModalVisible(true);
  };

  // Function to handle item selection
  const handleItemSelect = (id) => {
    setSelectedItemId(id);
    setModalVisible(false);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={handleClick}>Select Item</button>
      {selectedItemId && <div>Selected ID: {selectedItemId}</div>}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>JSON Items</h2>
            <ul>
              {jsonData.map((item) => (
                <li key={item.id} onClick={() => handleItemSelect(item.id)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveComponent;
