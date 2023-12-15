import React, { useState } from "react";
import { Button } from 'antd';
import './Predict.css';
import csvtojson from 'csvtojson';
import { Line } from 'react-chartjs-2';
import Navigator from "./Navigator";

function DataVisualization() {
    const [data, setData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    const handleUploadButtonClick = async () => {
        if (selectedFile) {
            const jsonData = await convertCSVtoJSON(selectedFile);
            sendDataToServer(jsonData);
        } else {
            console.error('No file selected');
        }
    }

    const convertCSVtoJSON = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const csvData = event.target.result;
                csvtojson()
                    .fromString(csvData)
                    .then((jsonArray) => {
                        resolve(jsonArray);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            };

            reader.readAsText(file);
        });
    };

    const sendDataToServer = async (jsonData) => {
        try {
            const response = await fetch('http://localhost:8888/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: jsonData })
            });

            console.log(JSON.stringify(jsonData));

            if (response.ok) {
                const responseData = await response.json();
                setData(responseData);
            } else {
                console.error('Failed to send data to the server');
            }
        } catch (error) {
            console.error('Error sending data to the server:', error);
        }
    };


    const chartLabels =
        data && Object.keys(data).length > 0
            ? Array.from({ length: data[Object.keys(data)[0]].length }, (_, i) => `Day ${i + 1}`)
            : [];

    const chartData =
        data
            ? Object.keys(data).map((modelName) => ({
                label: modelName,
                data: data[modelName],
            }))
            : [];


const chartOptions = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: (context) => {
                    const dataIndex = context.dataIndex;
                    const modelLabels = chartData.map((dataset) => {
                        const modelName = dataset.label;
                        const modelValue = dataset.data[dataIndex];
                        return `${modelName}: ${modelValue}`;
                    });
                    return modelLabels;
                },
            },
        },
    },
};

    return (
        <>
            {/* <Navigator /> */}
            <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h1>Import CSV File</h1>
                <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ width: 500, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding: 20, borderRadius: 10 }}>
                        <input type="file" name="csv" onChange={handleFileChange} style={{ fontFamily: 'Prompt, sans-serif' }} />
                        <Button type="primary" onClick={handleUploadButtonClick} style={{ fontFamily: 'Prompt, sans-serif', fontSize: 14 }}>Predict</Button>
                    </div>
                </form>
            </div>
            {data && (
                <div style={{ width: 800, height: 400, margin: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 15 }}>
                    <h3>{`Predictions for ${chartData[0]?.data.length || 0} Days`}</h3>
                    <Line data={{ labels: chartLabels, datasets: chartData }} options={chartOptions} />
                </div>
            )}
        </>
    );
}

export default DataVisualization;
