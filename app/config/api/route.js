import fs from 'fs-extra';

// export default async function POST(req, res) {
//   if (req.method === 'POST') {
//     const jsonData = req.body;
//     console.log('req.body: ', req.body)
    
//     await saveJsonToFile(jsonData);
//     console.log('jsonData: ', jsonData)
//     res.status(200).end();
//     return res.json({ message: 'success' });
//   } else {
//     return res.status(404).end();
//   }
// }

export async function POST(req, res) {
  console.log('hi')
  try {
    const filePath = './public/config_en.json'; // Specify the file path where you want to save the JSON file
    await fs.writeJson(filePath, jsonData);
    console.log('jsonData: ', jsonData);
    console.log('JSON file saved successfully.');
    res.status(200).end();

  } catch (error) {
    console.error('Error saving JSON file:', error);
  }
}

// const saveJsonToFile = async (jsonData) => {
//   try {
//     const filePath = './public/config_en.json'; // Specify the file path where you want to save the JSON file
//     await fs.writeJson(filePath, jsonData);
//     console.log('jsonData: ', jsonData);
//     console.log('JSON file saved successfully.');
//     res.status(200).end();

//   } catch (error) {
//     console.error('Error saving JSON file:', error);
//   }
// };
