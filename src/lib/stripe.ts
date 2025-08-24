import { loadStripe, Stripe } from '@stripe/stripe-js';

// TypeScript interfaces for Stripe responses
export interface PaymentIntentResponse {
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentConfirmationResponse {
  paymentIntent: {
    id: string;
    status: string;
    amount: number;
    currency: string;
    client_secret: string;
  };
  error: string | null;
}

export interface PayPalPaymentResponse {
  id: string;
  status: string;
  amount: {
    value: string;
    currency_code: string;
  };
  payer: {
    email_address: string;
  };
}

// Replace with your actual Stripe publishable key
// For demo purposes, using a test key format
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Stripe configuration
export const stripeConfig = {
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#1f2937',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      spacingUnit: '4px',
      borderRadius: '6px',
    },
  },
  loader: 'auto' as const,
};

// Mock Stripe server functions for demo
export const createPaymentIntent = async (amount: number, currency: string = 'usd'): Promise<PaymentIntentResponse> => {
  // In a real application, this would be a server-side API call to create a payment intent
  // For demo purposes, we'll simulate the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clientSecret: `pi_demo_${Date.now()}_secret_demo`,
        amount,
        currency,
        status: 'requires_payment_method'
      });
    }, 500);
  });
};

// Mock payment confirmation for demo
export const confirmPayment = async (clientSecret: string, paymentMethodId: string): Promise<PaymentConfirmationResponse> => {
  // In a real application, this would interact with Stripe's API
  // For demo purposes, we'll simulate success
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        paymentIntent: {
          id: `pi_demo_${Date.now()}`,
          status: 'succeeded',
          amount: 5000, // amount in cents
          currency: 'usd',
          client_secret: clientSecret
        },
        error: null
      });
    }, 2000);
  });
};

// Format amount for Stripe (convert dollars to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

// Format amount for display (convert cents to dollars)
export const formatAmountFromStripe = (amount: number): string => {
  return (amount / 100).toFixed(2);
};

// PayPal configuration for alternative payment method
export const paypalConfig = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'demo_paypal_client_id',
  currency: 'USD',
  intent: 'capture',
  debug: process.env.NODE_ENV === 'development'
};

// Mock PayPal payment processing
export const processPayPalPayment = async (amount: number): Promise<PayPalPaymentResponse> => {
  // In a real application, this would integrate with PayPal's SDK
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `PAYPAL_${Date.now()}`,
        status: 'COMPLETED',
        amount: {
          value: amount.toString(),
          currency_code: 'USD'
        },
        payer: {
          email_address: 'customer@example.com'
        }
      });
    }, 1500);
  });
};
