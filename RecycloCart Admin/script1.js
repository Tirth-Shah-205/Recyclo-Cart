document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

     let pendingOrders = [
        { id: '#ORD001', customer: 'John Doe', date: '2025-06-25' ,orderedProduct: 'Plastic Pellets, Pape' },
        { id: '#ORD002', customer: 'Jane Smith', date: '2025-06-24',orderedProduct: 'Glass Cullet'  },
        { id: '#ORD004', customer: 'Peter Jones', date: '2025-06-26' ,orderedProduct: 'Metal Scarps' }
    ];

    let completedOrders = [
        { id: '#ORD003', customer: 'Alice Johnson', date: '2025-06-23', orderedProduct: 'Recycled Paper Pulp'  }
    ];

    let rejectedOrders = []; 

    let pendingPickupOrders = [
        { id: '#PCK001', customer: 'Bob Williams', date: '2025-06-27', orderedProduct: 'Plastics'  },
        { id: '#PCK002', customer: 'Sarah Davis', date: '2025-06-28', orderedProduct: 'Glass, Paper' }
    ];

    let completedPickupOrders = [];
    let rejectedPickupOrders = [];

    let inventoryData = [
        { item: 'Recycled Plastic Pellets', quantity: 300, unit: 'pieces' },
        { item: 'Recycled Paper Pulp', quantity: 250, unit: 'pieces' },
        { item: 'Glass Cullet', quantity: 200, unit: 'pieces' }
    ];

    // Variables for stock management modal
    let currentSelectedItem = null;
    let currentSelectedQuantity = 0;

    // Get modal elements
    const stockManageModal = document.getElementById('stockManageModal');
    const modalItemName = document.getElementById('modalItemName');
    const modalCurrentQuantity = document.getElementById('modalCurrentQuantity');
    const orderQuantityInput = document.getElementById('orderQuantity');
    const orderConfirmationModal = document.getElementById('orderConfirmationModal');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Function to hide all sections and show the active one
    function showSection(sectionId) {
        dashboardSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Add click event listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            const targetSectionId = event.target.getAttribute('href').substring(1); // Get section ID from href

            // Remove 'active' class from all sidebar links
            sidebarLinks.forEach(item => item.classList.remove('active'));
            // Add 'active' class to the clicked link
            event.target.classList.add('active');

            showSection(targetSectionId);
        });
    });

    // Initialize: Show the "Overview" section and activate its sidebar link by default
    if (document.getElementById('overview')) {
        document.getElementById('overview').classList.add('active');
        document.querySelector('.sidebar ul li a[href="#overview"]').classList.add('active');
    }

    // --- Placeholder for fetching real data ---
    // In a real application, you would fetch data from your backend
    // using APIs (e.g., fetch() or Axios) and update the dashboard elements.

    function fetchDashboardData() {
        // Example of how you might update data (static for this example)
        document.getElementById('totalWasteRecycled').textContent = '15,230 kg';
        document.getElementById('remainingStocks').textContent = '750 units';
        document.getElementById('remainingOrders').textContent = pendingOrders.length;
        document.getElementById('completedOrders').textContent = completedOrders.length;
        document.getElementById('pendingPickupsCount').textContent = pendingPickupOrders.length;

        // Example for dynamic user data (imagine this comes from an API)
        const userData = [
            { username: 'user123', email: 'user123@example.com', firstName: 'John', lastName: 'Doe', password: 'Password1!',rewardPoints: 1500 },
            { username: 'ecoWarrior', email: 'ecowarrior@example.com',firstName: 'Joe', lastName: 'Don', password: 'Password1!', rewardPoints: 2300 },
            { username: 'greenThumb', email: 'greenthumb@example.com',firstName: 'green', lastName: 'thunder', password: 'Password1!', rewardPoints: 800 },
            { username: 'recycleKing', email: 'recycleking@example.com',firstName: 'Jonathan', lastName: 'smith', password: 'Password1!', rewardPoints: 3100 }
        ];

        const userTableBody = document.getElementById('userTableBody');
        if (userTableBody) {
            userTableBody.innerHTML = ''; // Clear existing rows
            userData.forEach(user => {
                const row = userTableBody.insertRow();
                row.insertCell().textContent = user.username;
                row.insertCell().textContent = user.email;
                row.insertCell().textContent = user.firstName;
                row.insertCell().textContent = user.lastName; 
                row.insertCell().textContent = user.password;  
                row.insertCell().textContent = user.rewardPoints;
            });
        }

        populateGenericTable('pendingOrdersTableBody', pendingOrders, true  , 'order'); // true for actions
        populateGenericTable('completedOrdersTableBody', completedOrders, false , 'order'); // false for no actions
        populateGenericTable('rejectedOrdersTableBody', rejectedOrders, false, 'order'); // false for no actions

        populateGenericTable('pendingPickupOrdersTableBody', pendingPickupOrders, true, 'pickup');
        populateGenericTable('completedPickupOrdersTableBody', completedPickupOrders, false, 'pickup');
        populateGenericTable('rejectedPickupOrdersTableBody', rejectedPickupOrders, false, 'pickup');

        populateInventoryTable('inventoryTableBody', inventoryData);
    }

    function populateGenericTable(tableBodyId, orders, includeActions, type) {
        const tableBody = document.getElementById(tableBodyId);
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear existing rows
            orders.forEach(order => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = order.id;
                row.insertCell().textContent = order.customer;
                row.insertCell().textContent = order.date;
                row.insertCell().textContent = order.orderedProduct|| '';
    
                if (includeActions) {
                    const actionsCell = row.insertCell();
                    const acceptButton = document.createElement('button');
                    acceptButton.textContent = 'Accept';
                    acceptButton.classList.add('action-button', 'accept-button');
                    if (type === 'order') {
                        acceptButton.onclick = () => acceptOrder(order.id);
                    } else if (type === 'pickup') {
                        acceptButton.onclick = () => acceptPickupOrder(order.id);
                    }
                    actionsCell.appendChild(acceptButton);

                    const rejectButton = document.createElement('button');
                    rejectButton.textContent = 'Reject';
                    rejectButton.classList.add('action-button', 'reject-button');
                    if (type === 'order') {
                        rejectButton.onclick = () => rejectOrder(order.id);
                    } else if (type === 'pickup') {
                        rejectButton.onclick = () => rejectPickupOrder(order.id);
                    }
                    actionsCell.appendChild(rejectButton);
                }
            });
        }
    }

    function populateInventoryTable(tableBodyId, data) {
        const tableBody = document.getElementById(tableBodyId);
        if (tableBody) {
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach(item => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = item.item;
                row.insertCell().textContent = item.quantity;
                row.insertCell().textContent = item.unit;

                const actionsCell = row.insertCell();
                const manageButton = document.createElement('button');
                manageButton.textContent = 'Manage Stock';
                manageButton.classList.add('manage-stock-button');
                manageButton.onclick = () => openManageStockModal(item.item, item.quantity);
                actionsCell.appendChild(manageButton);
            });
        }
    }

    // Function to accept an order
    window.acceptOrder = (orderId) => {
        const index = pendingOrders.findIndex(order => order.id === orderId);
        if (index !== -1) {
            const [acceptedOrder] = pendingOrders.splice(index, 1); // Remove from pending
            completedOrders.push(acceptedOrder); // Add to completed
            fetchDashboardData(); // Re-render tables
        }
    };

    // Function to reject an order
    window.rejectOrder = (orderId) => {
        const index = pendingOrders.findIndex(order => order.id === orderId);
        if (index !== -1) {
            const [rejectedOrder] = pendingOrders.splice(index, 1); // Remove from pending
            rejectedOrders.push(rejectedOrder); // Add to rejected
            fetchDashboardData(); // Re-render tables
        }
    };

    window.acceptPickupOrder = (pickupId) => {
        const index = pendingPickupOrders.findIndex(pickup => pickup.id === pickupId);
        if (index !== -1) {
            const [acceptedPickup] = pendingPickupOrders.splice(index, 1);
            completedPickupOrders.push(acceptedPickup);
            fetchDashboardData(); // Re-render tables and update counts
        }
    };

    window.rejectPickupOrder = (pickupId) => {
        const index = pendingPickupOrders.findIndex(pickup => pickup.id === pickupId);
        if (index !== -1) {
            const [rejectedPickup] = pendingPickupOrders.splice(index, 1);
            rejectedPickupOrders.push(rejectedPickup);
            fetchDashboardData(); // Re-render tables and update counts
        }
    };

    window.openManageStockModal = (item, quantity) => {
        currentSelectedItem = item;
        currentSelectedQuantity = quantity;
        modalItemName.textContent = item;
        modalCurrentQuantity.textContent = quantity;
        orderQuantityInput.value = 1; // Reset input field
        stockManageModal.style.display = 'flex'; // Use flex to center
    };

    window.closeManageStockModal = () => {
        stockManageModal.style.display = 'none';
    };

    window.orderStock = () => {
        const quantityToOrder = parseInt(orderQuantityInput.value);
        if (isNaN(quantityToOrder) || quantityToOrder <= 0) {
            console.error("Please enter a valid positive quantity.");
            // You could display an error message in the modal itself instead of console.error
            return;
        }

        // In a real application, you would send this data to a backend API
        // For this example, we'll simulate an order and update the inventory in memory
        const itemIndex = inventoryData.findIndex(item => item.item === currentSelectedItem);
        if (itemIndex !== -1) {
            inventoryData[itemIndex].quantity += quantityToOrder; // Add ordered quantity to current stock
        }

        // Display confirmation pop-up
        confirmationMessage.textContent = `You have ordered ${quantityToOrder} pieces of ${currentSelectedItem}.`;
        orderConfirmationModal.style.display = 'flex';
        closeManageStockModal(); // Close the stock management modal
        fetchDashboardData(); // Re-render inventory table to show updated quantity
    };

    window.closeOrderConfirmationModal = () => {
        orderConfirmationModal.style.display = 'none';
    };


    fetchDashboardData();

    // Logout button functionality (example)
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'adminlogin1.html';
        });
    }
});