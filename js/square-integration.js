// square-integration.js
// This file handles the server-side integration with Square API
// Note: This would be used in a Node.js environment (not client-side)
// Example implementation for Express.js server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Client, Environment, ApiError } = require('square');

// Configure Square Client
const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Set this in your environment variables
  environment: Environment.Sandbox // Use Environment.Production for live transactions
});

// Get API clients
const { paymentsApi, ordersApi, customersApi } = client;

/**
 * Process payment with Square
 * @param {Object} paymentData - Payment data from client
 * @returns {Promise} - Promise resolving to payment result
 */
async function processPayment(paymentData) {
  try {
    // 1. Create or find customer (optional)
    let customerId;
    if (paymentData.customer && paymentData.customer.email) {
      customerId = await findOrCreateCustomer(paymentData.customer);
    }
    
    // 2. Create order in Square
    const orderResult = await createOrder(paymentData.items, customerId);
    const orderId = orderResult.order.id;
    
    // 3. Process payment
    const payment = await createPayment({
      sourceId: paymentData.sourceId,
      orderId: orderId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      customerId: customerId
    });
    
    return {
      success: true,
      payment: payment,
      orderId: orderId
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      error: error.message || 'Payment processing failed'
    };
  }
}

// Export the main function
module.exports = { processPayment };

// If this file is being run directly, start the server
if (require.main === module) {
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  
  // Process payment endpoint
  app.post('/api/process-payment', async (req, res) => {
    try {
      const paymentData = req.body;
      const result = await processPayment(paymentData);
      
      if (result.success) {
        res.status(200).json({
          success: true,
          payment: result.payment,
          orderId: result.orderId
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      console.error('Payment endpoint error:', error);
      res.status(500).json({
        success: false,
        error: 'Server error processing payment'
      });
    }
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Square payment server running on port ${PORT}`);
  });
}

/**
 * Create an order in Square
 * @param {Array} items - Cart items
 * @param {string} customerId - Optional customer ID
 * @returns {Promise} - Promise resolving to order result
 */
async function createOrder(items, customerId = null) {
  try {
    // Format line items for Square API
    const lineItems = items.map(item => ({
      name: item.name,
      quantity: item.quantity.toString(),
      basePriceMoney: {
        amount: Math.round(item.price * 100), // Convert to cents
        currency: 'USD'
      }
    }));
    
    // Create order request
    const orderRequest = {
      order: {
        lineItems,
        state: 'OPEN'
      },
      idempotencyKey: Date.now().toString()
    };
    
    // Add customer ID if available
    if (customerId) {
      orderRequest.order.customerId = customerId;
    }
    
    // Create the order
    const { result } = await ordersApi.createOrder(orderRequest);
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Process payment with Square Payments API
 * @param {Object} paymentDetails - Payment details
 * @returns {Promise} - Promise resolving to payment result
 */
async function createPayment({ sourceId, orderId, amount, currency, customerId = null }) {
  try {
    const paymentRequest = {
      sourceId: sourceId,
      idempotencyKey: Date.now().toString(),
      amountMoney: {
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency
      },
      orderId: orderId,
      autocomplete: true
    };
    
    // Add customer ID if available
    if (customerId) {
      paymentRequest.customerId = customerId;
    }
    
    const { result } = await paymentsApi.createPayment(paymentRequest);
    return result;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}

/**
 * Find existing customer or create a new one
 * @param {Object} customerData - Customer information
 * @returns {Promise<string>} - Customer ID
 */
async function findOrCreateCustomer(customerData) {
  try {
    // Try to search for customer by email
    const { result } = await customersApi.searchCustomers({
      query: {
        filter: {
          emailAddress: {
            exact: customerData.email
          }
        }
      }
    });
    
    // If customer exists, return their ID
    if (result.customers && result.customers.length > 0) {
      return result.customers[0].id;
    }
    
    // Otherwise create a new customer
    const { result: newCustomer } = await customersApi.createCustomer({
      givenName: customerData.name.split(' ')[0] || '',
      familyName: customerData.name.split(' ').slice(1).join(' ') || '',
      emailAddress: customerData.email,
      phoneNumber: customerData.phone || ''
    });
    
    return newCustomer.customer.id;
  } catch (error) {
    console.error('Error finding/creating customer:', error);
    // Continue without customer ID if there's an error
    return null;
  }
}