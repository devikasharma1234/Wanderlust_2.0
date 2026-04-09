// razorpay
const Razorpay = require("razorpay");
const {RZP_API_KEY, RZP_API_SECRET} = process.env;
const fs = require("fs");
// const path = require("path"); // Added path module
// const {validateWebhookSignature} = require("razorpay/dist/utils/razorpay-utils");

// const razorpay = new Razorpay({
//     key_id: RZP_API_KEY,
//     key_secret: RZP_API_SECRET,
// });

// // Function to read data from JSON file
// const readData = () => {
//   if (fs.existsSync('orders.json')) {
//     const data = fs.readFileSync('orders.json');
//     return JSON.parse(data);
//   }
//   return [];
// };

// // Function to write data to JSON file
// const writeData = (data) => {
//   fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
// };

// // Initialize orders.json if it doesn't exist
// if (!fs.existsSync('orders.json')) {
//   writeData([]);
// }

// // Route to handle order creation
// const createOrder = async (req, res) => {
//   try {
//     const { amount, currency, receipt, notes } = req.body;

//     const options = {
//       amount: amount * 100, // Convert amount to paise
//       currency,
//       receipt,
//       notes,
//     };
  

//     // fetch('/create-order', {
//     // method: 'POST',
//     // headers: {
//     //     'Content-Type': 'application/json', // <--- This is important!
//     // },
//     // body: JSON.stringify({
//     //     amount: 500,
//     //     currency: 'INR',
//     //     receipt: 'order_rcptid_11'
//     // })


//     const order = await razorpay.orders.create(options);

//     // Read current orders, add new order, and write back to the file
//     const orders = readData();
//     orders.push({
//       order_id: order.id,
//       amount: amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       status: 'created',
//     });
//     writeData(orders);

//     res.json(order); // Send order details to frontend, including order ID
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error creating order');
//   }
// };

// // route to sere success page
// const renderSuccess = (req, res) => {
//     res.render("payments/success.ejs");
// };

// module.exports = { createOrder, renderSuccess };


const razorpay = new Razorpay({
    key_id: RZP_API_KEY,
    key_secret: RZP_API_SECRET,
});

const readData = () => {
    if (fs.existsSync('orders.json')) {
        return JSON.parse(fs.readFileSync('orders.json'));
    }
    return [];
};

const writeData = (data) => {
    fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
};

// Handle Order Creation
const createOrder = async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;
        const options = {
            amount: amount * 100, // Razorpay expects paise
            currency,
            receipt,
        };

        const order = await razorpay.orders.create(options);

        // Store in JSON for tracking
        const orders = readData();
        orders.push({
            order_id: order.id,
            amount: amount,
            status: 'created',
        });
        writeData(orders);

        res.json(order); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating order');
    }
};

const renderSuccess = (req, res) => {
    // Access query params sent from frontend handler
    const { order_id, payment_id } = req.query;
    res.render("payments/success.ejs", { orderId: order_id, paymentId: payment_id });
};

module.exports = { createOrder, renderSuccess };