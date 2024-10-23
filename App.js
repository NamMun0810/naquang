import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch clustering data from the backend (you'll need to adjust the endpoint)
    axios.get('http://localhost:8000/get-cluster-data')
      .then(response => {
        // Assuming response contains x, y, and cluster labels
        setData(response.data);
      })
      .catch(error => console.error("Error fetching data", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    datasets: [
      {
        label: 'Cluster 1',
        data: data.filter(item => item.cluster === 1).map(item => ({ x: item.x, y: item.y })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 6,
      },
      {
        label: 'Cluster 2',
        data: data.filter(item => item.cluster === 2).map(item => ({ x: item.x, y: item.y })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Housing Segments Based on K-Means Clustering',
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Feature 1 (e.g., size)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Feature 2 (e.g., price)',
        },
      },
    },
  };

  return (
    <div className="App">
      <Scatter data={chartData} options={options} />
    </div>
  );
}

export default App;
