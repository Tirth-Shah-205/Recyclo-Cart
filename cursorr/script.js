// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the recycling activity chart
    initRecyclingChart();
    
    // Add event listeners
    initEventListeners();
});

// Initialize Chart.js for Recycling Activity
function initRecyclingChart() {
    const ctx = document.getElementById('recyclingChart').getContext('2d');
    
    // Sample data for the recycling chart (last 6 months)
    const recyclingData = {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Paper (kg)',
                data: [15, 18, 12, 20, 18, 24],
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Plastic (kg)',
                data: [10, 12, 15, 8, 14, 16],
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'Electronic (kg)',
                data: [5, 3, 6, 4, 8, 5],
                backgroundColor: 'rgba(155, 89, 182, 0.2)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    // Chart configuration
    const recyclingChart = new Chart(ctx, {
        type: 'line',
        data: recyclingData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Initialize event listeners for interactive elements
function initEventListeners() {
    // Schedule new pickup button
    const scheduleBtn = document.querySelector('.btn-secondary');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            alert('Schedule new pickup feature will be implemented here.');
        });
    }
    
    // Product "Add to Cart" buttons
    const addToCartBtns = document.querySelectorAll('.product-info .btn-primary');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const productName = e.target.closest('.product-card').querySelector('h3').textContent;
            alert(`${productName} has been added to your cart!`);
        });
    });
    
    // Edit and Cancel buttons for pickup items
    const editButtons = document.querySelectorAll('.pickup-actions .btn-primary');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const pickupItem = e.target.closest('.pickup-item');
            const pickupTitle = pickupItem.querySelector('h3').textContent;
            alert(`Edit ${pickupTitle} details`);
        });
    });
    
    const cancelButtons = document.querySelectorAll('.pickup-actions .btn-outline');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const pickupItem = e.target.closest('.pickup-item');
            const pickupTitle = pickupItem.querySelector('h3').textContent;
            if (confirm(`Are you sure you want to cancel the "${pickupTitle}" pickup?`)) {
                // Animation for removing the item (slide up and fade out)
                pickupItem.style.transition = 'all 0.5s ease';
                pickupItem.style.opacity = '0';
                pickupItem.style.maxHeight = '0';
                pickupItem.style.overflow = 'hidden';
                pickupItem.style.padding = '0';
                pickupItem.style.margin = '0';
                
                // Remove item after animation completes
                setTimeout(() => {
                    pickupItem.remove();
                }, 500);
            }
        });
    });
    
    // Navigation menu items
    const navItems = document.querySelectorAll('.nav-menu ul li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Get the menu item text and show a message (in a real app, this would navigate to the page)
            const menuText = item.querySelector('a').textContent.trim();
            if (menuText !== 'Dashboard') {
                alert(`Navigating to ${menuText} page`);
            }
        });
    });
    
    // Notifications click
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            alert('You have 3 new notifications');
        });
    }
    
    // View All links
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionTitle = link.closest('.content-header').querySelector('h2').textContent;
            alert(`View all ${sectionTitle}`);
        });
    });
    
    // Search functionality (simple implementation)
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert(`Searching for: ${searchInput.value}`);
                searchInput.value = '';
            }
        });
    }
}

// Simulated data for a full application
const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Green Street, Eco City',
    tokenPoints: 450,
    recyclingHistory: [
        { date: '2023-10-01', type: 'Paper', weight: 5.2, points: 26 },
        { date: '2023-09-15', type: 'Plastic', weight: 3.8, points: 38 },
        { date: '2023-09-02', type: 'Electronics', weight: 2.1, points: 42 },
        { date: '2023-08-18', type: 'Glass', weight: 4.5, points: 22 },
        { date: '2023-08-05', type: 'Paper', weight: 6.3, points: 31 }
    ],
    upcomingPickups: [
        { id: 1, date: '2023-10-15', type: 'Paper & Cardboard', time: '10:00 AM - 12:00 PM', address: '123 Green Street, Eco City' },
        { id: 2, date: '2023-10-22', type: 'Electronics & Batteries', time: '2:00 PM - 4:00 PM', address: '456 Recycle Avenue, Eco City' }
    ],
    purchaseHistory: [
        { date: '2023-09-20', product: 'Recycled Notebook', points: 120 },
        { date: '2023-09-05', product: 'Eco-Friendly Water Bottle', points: 180 },
        { date: '2023-08-22', product: 'Recycled Tote Bag', points: 85 }
    ]
};

// Function to update user profile data (for a dynamic application)
function updateUserProfile(userData) {
    // Update profile name
    const profileName = document.querySelector('.profile span');
    if (profileName) {
        profileName.textContent = userData.name;
    }
    
    // Update welcome message
    const welcomeMessage = document.querySelector('.dashboard-title p');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${userData.name.split(' ')[0]}! Here's your recycling overview.`;
    }
    
    // Update token points display
    const tokenPoints = document.querySelector('.stat-icon.blue + .stat-details .stat-value');
    if (tokenPoints) {
        tokenPoints.textContent = userData.tokenPoints;
    }
}

// Function to format date (helper function)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
} 