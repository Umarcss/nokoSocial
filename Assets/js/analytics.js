// DOM Elements
const timeRange = document.getElementById('time-range');

// Chart Colors
const chartColors = {
    primary: '#1d9bf0',
    secondary: '#7856ff',
    success: '#00ba7c',
    danger: '#f4212e',
    warning: '#ffd400',
    info: '#1d9bf0',
    light: '#eff3f4',
    dark: '#0f1419'
};

// Engagement Chart
const engagementCtx = document.getElementById('engagementChart').getContext('2d');
const engagementChart = new Chart(engagementCtx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Profile Views',
                data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
                borderColor: chartColors.primary,
                backgroundColor: 'rgba(29, 155, 240, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Engagement',
                data: [800, 1200, 900, 1400, 1100, 1600, 1300],
                borderColor: chartColors.secondary,
                backgroundColor: 'rgba(120, 86, 255, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    boxWidth: 12,
                    padding: 15
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                padding: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    padding: 10,
                    font: {
                        size: 11
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    padding: 10,
                    font: {
                        size: 11
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    }
});

// Demographics Chart
const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');
const demographicsChart = new Chart(demographicsCtx, {
    type: 'doughnut',
    data: {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
            data: [30, 40, 15, 10, 5],
            backgroundColor: [
                chartColors.primary,
                chartColors.secondary,
                chartColors.success,
                chartColors.warning,
                chartColors.danger
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                align: 'center',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                    font: {
                        size: 11
                    }
                }
            },
            tooltip: {
                padding: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1
            }
        },
        cutout: '70%'
    }
});

// Time Range Change Handler
timeRange.addEventListener('change', async (e) => {
    const days = parseInt(e.target.value);
    
    // Show loading state
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0.5';
    });

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update chart data based on time range
        const newData = generateRandomData(days);
        updateCharts(newData);
        updateCards(newData);

        // Show success message
        showToast('Data updated successfully');
    } catch (error) {
        showToast('Error updating data', 'error');
    } finally {
        // Reset loading state
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '1';
        });
    }
});

// Generate random data for charts
function generateRandomData(days) {
    const data = {
        profileViews: [],
        engagement: [],
        demographics: []
    };

    for (let i = 0; i < days; i++) {
        data.profileViews.push(Math.floor(Math.random() * 2000) + 1000);
        data.engagement.push(Math.floor(Math.random() * 1500) + 500);
    }

    data.demographics = [
        Math.floor(Math.random() * 30) + 20,
        Math.floor(Math.random() * 30) + 30,
        Math.floor(Math.random() * 20) + 10,
        Math.floor(Math.random() * 15) + 5,
        Math.floor(Math.random() * 10) + 2
    ];

    return data;
}

// Update charts with new data
function updateCharts(data) {
    // Update engagement chart
    engagementChart.data.datasets[0].data = data.profileViews;
    engagementChart.data.datasets[1].data = data.engagement;
    engagementChart.update();

    // Update demographics chart
    demographicsChart.data.datasets[0].data = data.demographics;
    demographicsChart.update();
}

// Update overview cards
function updateCards(data) {
    const cards = document.querySelectorAll('.card-info h2');
    const trends = document.querySelectorAll('.trend');

    // Update profile views
    cards[0].textContent = formatNumber(data.profileViews.reduce((a, b) => a + b, 0));
    trends[0].innerHTML = generateTrendHTML(Math.random() > 0.3);

    // Update followers
    cards[1].textContent = formatNumber(Math.floor(Math.random() * 500) + 100);
    trends[1].innerHTML = generateTrendHTML(Math.random() > 0.2);

    // Update likes
    cards[2].textContent = formatNumber(data.engagement.reduce((a, b) => a + b, 0));
    trends[2].innerHTML = generateTrendHTML(Math.random() > 0.3);

    // Update comments
    cards[3].textContent = formatNumber(Math.floor(Math.random() * 2000) + 500);
    trends[3].innerHTML = generateTrendHTML(Math.random() > 0.4);
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Generate trend HTML
function generateTrendHTML(isPositive) {
    const percentage = (Math.random() * 20).toFixed(1);
    const icon = isPositive ? 'uil-arrow-up' : 'uil-arrow-down';
    const className = isPositive ? 'positive' : 'negative';
    return `<i class="uil ${icon}"></i> ${percentage}%`;
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    const initialData = generateRandomData(7);
    updateCharts(initialData);
    updateCards(initialData);
}); 