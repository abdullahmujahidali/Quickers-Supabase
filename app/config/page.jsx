'use client'
import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [originalData, setOriginalData] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [confirmSave, setConfirmSave] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
  
    useEffect(() => {
      fetchJsonData();
    }, []);
  
    const fetchJsonData = async () => {
      try {
        const response = await fetch('https://quickers-uk.vercel.app/');
        if (response.ok) {
          const jsonData = await response.json();
          const specialOffersLayout = jsonData?.HorizonLayout?.find(
            (layout) => layout?.title?.title === 'Special Offers 👀'
          );
          setOriginalData(jsonData);
          setEditedData(specialOffersLayout);
          const urls = specialOffersLayout?.items?.map((item) => item?.image) || [];
          setImageUrls(urls);
        } else {
          throw new Error('Failed to fetch JSON data');
        }
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
  
    const handleSave = () => {
        const newData = { ...originalData };
      
        if (newData && newData.HorizonLayout) {
          const specialOffersLayout = newData.HorizonLayout.find(
            (layout) => layout.title?.title === 'Special Offers 👀'
          );
      
          if (specialOffersLayout) {
            specialOffersLayout.items.forEach((item, index) => {
              item.image = imageUrls[index];
            });
          }
        }
        setEditedData(newData);
        setShowDialog(false);
        setConfirmSave(true);
      };
      
  
    const handleReject = () => {
      setEditedData(originalData);
      setShowDialog(false);
    };
  
    const handleEdit = (event) => {
      const { value } = event.target;
      try {
        const parsedData = JSON.parse(value);
        setEditedData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };
  
    const handleImageUrlChange = (index, event) => {
      const newImageUrls = [...imageUrls];
      newImageUrls[index] = event.target.value;
      setImageUrls(newImageUrls);
    };
      return (
        <div>
            <div className="gradient" />
          <div className="app">
            <h1 className="head_text">Add new URL's</h1>
            {editedData && (
              <>
                {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center mt-6 mb-2">
                    <label
                        htmlFor={`image-${index + 1}`}
                        className="mr-8 font-bold"
                    >
                        Image{index + 1}:
                    </label>
                    <input
                        id={`image-${index + 1}`}
                        className="w-[300px] glassmorphism"
                        type="text"
                        value={url}
                        onChange={(event) => handleImageUrlChange(index, event)}
                    />
                </div>
                ))}

                <button className="black_btn mt-2" onClick={handleSave}>
                  Save Changes
                </button>
              </>
            )}
            {confirmSave && (
              <div className="prompt_layout">
                <div className="prompt_card">
                  <p>Are you sure you want to save the changes?</p>
                  <button className="black_btn mt-2" onClick={handleSave}>
                    Save
                  </button>
                  <button className="outline_btn mt-2" onClick={handleReject}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

export default MyComponent;
