// Sample Data for Insights - This would come from your model's output
const topSuburbs = ["Richmond", "South Yarra", "Carlton", "Fitzroy", "Docklands"];
const priceTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [{
        label: 'Price Trend in 2024',
        data: [800000, 850000, 830000, 880000, 870000, 890000, 900000, 910000, 920000, 940000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
    }]
};

// Render Price Trend Chart
const ctx = document.getElementById('priceTrendChart').getContext('2d');
const priceTrendChart = new Chart(ctx, {
    type: 'line',
    data: priceTrendData,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Housing Price Trends - 2024'
        },
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem) {
                    return `$${tooltipItem.yLabel.toLocaleString()}`;
                }
            }
        }
    }
});

// Render Top Suburbs List with Search Filter
const suburbsList = document.getElementById('topSuburbsList');
const searchInput = document.getElementById('searchSuburb');

function renderSuburbsList(suburbs) {
    suburbsList.innerHTML = ''; // Clear the list
    suburbs.forEach(suburb => {
        const listItem = document.createElement('li');
        listItem.textContent = suburb;
        suburbsList.appendChild(listItem);
    });
}

// Initial rendering of all suburbs
renderSuburbsList(topSuburbs);

// Filter suburbs based on search input
searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();
    const filteredSuburbs = topSuburbs.filter(suburb => suburb.toLowerCase().includes(searchText));
    renderSuburbsList(filteredSuburbs);
});

// Price Prediction Tool using machine learning (Random Forest model)
document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const size = document.getElementById('size').value;

    // Random Forest model calculation simulation
    const estimatedPrice = (size * 5500) + (bedrooms * 95000);
    
    document.getElementById('priceOutput').textContent = `$${estimatedPrice.toLocaleString()}`;
});

// Feature Importance Chart (Random Forest Model)
const featureCtx = document.getElementById('featureImportanceChart').getContext('2d');
const featureImportanceData = {
    labels: ['Size', 'Bedrooms', 'Location'],
    datasets: [{
        label: 'Feature Importance',
        data: [0.5, 0.3, 0.2],
        backgroundColor: ['#007BFF', '#FFC107', '#28A745'],
    }]
};
const featureChart = new Chart(featureCtx, {
    type: 'bar',
    data: featureImportanceData,
    options: {
        title: {
            display: true,
            text: 'Feature Importance in Price Prediction (Random Forest)'
        }
    }
});

// Scatter Plot for K-Means Clustering (Sample Data)
const scatterCtx = document.getElementById('scatterPlot').getContext('2d');
const scatterData = {
    datasets: [{
        label: 'Cluster 1',
        data: [
            {x: 50, y: 400000},
            {x: 100, y: 600000},
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }, {
        label: 'Cluster 2',
        data: [
            {x: 150, y: 800000},
            {x: 200, y: 900000},
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
    }]
};

const scatterPlot = new Chart(scatterCtx, {
    type: 'scatter',
    data: scatterData,
    options: {
        title: {
            display: true,
            text: 'House Price Segments Based on Size and Price'
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: 'Size (sqm)'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Price ($)'
                },
                ticks: {
                    callback: function(value) {
                        return `$${value.toLocaleString()}`;
                    }
                }
            }]
        }
    }
});

// Handle Navigation Between Insights and About Us Sections
document.getElementById('insights-link').addEventListener('click', function() {
    document.getElementById('insights-section').style.display = 'block';
    document.getElementById('about-section').style.display = 'none';
});

document.getElementById('about-link').addEventListener('click', function() {
    document.getElementById('insights-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'block';
});

// Show Insights by default when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('insights-section').style.display = 'block';
    document.getElementById('about-section').style.display = 'none';
});

// Handle Navigation Between Insights and About Us Sections
document.getElementById('insights-link').addEventListener('click', function() {
    document.getElementById('insights-section').style.display = 'block';
    document.getElementById('about-section').style.display = 'none';

    // Change hero text back to the Insights page content
    document.getElementById('hero-text-content').textContent = 'Discover Insights and Make Smart Investments';
});

document.getElementById('about-link').addEventListener('click', function() {
    document.getElementById('insights-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'block';

    // Change hero text to the About Us page content
    document.getElementById('hero-text-content').textContent = 'Join Us Now';
});

// Show Insights by default when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('insights-section').style.display = 'block';
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('hero-text-content').textContent = 'Discover Insights and Make Smart Investments';
});

document.addEventListener("DOMContentLoaded", function() {
    fetch("http://127.0.0.1:8000/kmeans-clustering/")
        .then(response => response.json())
        .then(data => {
            const clusters = data.clusters;

            // Prepare the data for Chart.js
            const cluster1 = clusters.filter(point => point.label === 0);
            const cluster2 = clusters.filter(point => point.label === 1);

            const chartData = {
                datasets: [
                    {
                        label: "Cluster 1",
                        data: cluster1.map(point => ({ x: point.x, y: point.y })),
                        backgroundColor: "rgba(75, 192, 192, 0.6)"
                    },
                    {
                        label: "Cluster 2",
                        data: cluster2.map(point => ({ x: point.x, y: point.y })),
                        backgroundColor: "rgba(255, 99, 132, 0.6)"
                    }
                ]
            };

            const ctx = document.getElementById('kmeansChart').getContext('2d');
            new Chart(ctx, {
                type: 'scatter',
                data: chartData,
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'X-Axis'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Y-Axis (Prices)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching clustering data:", error));
});
