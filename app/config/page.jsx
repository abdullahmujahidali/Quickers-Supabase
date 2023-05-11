'use client'
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { createClient } from '@supabase/supabase-js';

function MyComponent() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPERBASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_KEY
        );
    const [originalData, setOriginalData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const { data: jsonData, error: fetchError } = useSWR(
        process.env.NEXT_PUBLIC_API_ROUTE,
        async (url) => {
          const response = await fetch(url);
          if (response.ok) {
            const blob = await response.blob();
            const reader = new FileReader();
      
            return new Promise((resolve, reject) => {
              reader.onloadend = () => {
                const parsedData = JSON.parse(reader.result);
                resolve(parsedData);
              };
      
              reader.onerror = reject;
              reader.readAsText(blob);
            });
          } else {
            throw new Error('Failed to fetch JSON data');
          }
        }
      );
      
      useEffect(() => {
        if (jsonData) {
          const specialOffersLayout = jsonData?.HorizonLayout?.find(
            (layout) => layout?.title?.title === 'Special Offers 👀'
          );
          setOriginalData(jsonData);
          setEditedData(specialOffersLayout);
          const urls = specialOffersLayout?.items?.map((item) => item?.image) || [];
          setImageUrls(urls);
        }
      }, [jsonData]);
      
    
    const handleSave = async () => {
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

        try {
        const { error: uploadError } = await supabase.storage
            .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
            .update('config_en.json', JSON.stringify(newData));
    
        if (uploadError) {
            console.error('Error updating file:', uploadError);
        } else {
            console.log('JSON file updated successfully.');
            // Trigger revalidation and update the cache
            mutate(process.env.NEXT_PUBLIC_API_ROUTE);
        }
        } catch (error) {
        console.error('Error saving JSON file:', error);
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
            </div>
            </div>
        );
}

export default MyComponent;
