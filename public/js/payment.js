// public/js/payment.js
const initializeRazorpay = async (listingId, listingPrice, listingTitle, rzpKey) => {
    try {
        const response = await fetch('/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: listingPrice, 
                currency: "INR",
                receipt: `receipt_${listingId}`
            })
        });

        const order = await response.json();

        const options = {
            "key": rzpKey, // Passed from EJS
            "amount": order.amount, 
            "currency": "INR",
            "name": "Wanderlust",
            "description": listingTitle,
            "order_id": order.id, 
            "handler": function (response) {
                window.location.href = `/success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`;
            },
            "theme": { "color": "#fe424d" }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
        
    } catch (error) {
        console.error("Payment initialization failed:", error);
        alert("Something went wrong with the payment.");
    }
};