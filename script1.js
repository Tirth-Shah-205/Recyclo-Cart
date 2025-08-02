document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    const amountInput = document.getElementById('amount');
    const nameInput = document.getElementById('name');
    const payButton = document.getElementById('pay-button');

    // Format card number with spaces
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });

    // Format expiry date
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });

    // Validate CVV
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Validate amount
    amountInput.addEventListener('input', function(e) {
        if (e.target.value < 0) {
            e.target.value = 0;
        }
    });

    // Handle payment submission
    payButton.addEventListener('click', function() {
        if (!validateForm()) {
            return;
        }

        // Disable button and show processing state
        payButton.disabled = true;
        payButton.textContent = 'Processing...';

        // Simulate payment processing
        setTimeout(() => {
            const success = Math.random() > 0.5; // 50% chance of success
            if (success) {
                alert('Payment successful! Thank you for your payment.');
                resetForm();
            } else {
                alert('Payment failed. Please try again.');
            }
            payButton.disabled = false;
            payButton.textContent = 'Pay Now';
        }, 2000);
    });

    function validateForm() {
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        const expiry = expiryInput.value;
        const cvv = cvvInput.value;
        const amount = amountInput.value;
        const name = nameInput.value.trim();

        if (!cardNumber || cardNumber.length !== 16) {
            alert('Please enter a valid 16-digit card number');
            return false;
        }

        if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Please enter a valid expiry date (MM/YY)');
            return false;
        }

        if (!cvv || cvv.length !== 3) {
            alert('Please enter a valid 3-digit CVV');
            return false;
        }

        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return false;
        }

        if (!name) {
            alert('Please enter cardholder name');
            return false;
        }

        return true;
    }

    function resetForm() {
        cardNumberInput.value = '';
        expiryInput.value = '';
        cvvInput.value = '';
        amountInput.value = '';
        nameInput.value = '';
    }
}); 