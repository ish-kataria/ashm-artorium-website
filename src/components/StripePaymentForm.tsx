"use client";

import { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getStripe, stripeConfig, createPaymentIntent, confirmPayment, formatAmountForStripe, type PaymentIntentResponse, type PaymentConfirmationResponse } from '@/lib/stripe';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  customerEmail: string;
  customerName: string;
}

const PaymentForm = ({ amount, onSuccess, onError, customerEmail, customerName }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Create payment intent when component mounts
    const initializePayment = async () => {
      try {
        const paymentIntent: PaymentIntentResponse = await createPaymentIntent(formatAmountForStripe(amount));
        setClientSecret(paymentIntent.clientSecret);
      } catch (err) {
        setError('Failed to initialize payment. Please try again.');
      }
    };

    initializePayment();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError('Payment system not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card information not found. Please refresh and try again.');
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerName,
          email: customerEmail,
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message || 'Payment method creation failed.');
        setIsProcessing(false);
        return;
      }

      // Confirm payment (in demo, this is mocked)
      const result: PaymentConfirmationResponse = await confirmPayment(clientSecret, paymentMethod.id);

      if (result.error) {
        setError(result.error || 'Payment failed. Please try again.');
        onError(result.error || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        onSuccess(result.paymentIntent.id);
      } else {
        setError('Payment was not completed. Please try again.');
        onError('Payment was not completed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#6b7280',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* Card Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="p-3 border border-gray-300 rounded-md bg-white">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Demo Notice */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Demo Mode:</strong> This is a demonstration. No real payment will be processed.
            Use test card: 4242 4242 4242 4242 with any future expiry date and any 3-digit CVC.
          </AlertDescription>
        </Alert>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Pay ${amount.toFixed(2)}
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <span>Secured by Stripe</span>
        </div>
      </div>
    </form>
  );
};

interface StripePaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  customerEmail: string;
  customerName: string;
}

export default function StripePaymentForm({
  amount,
  onSuccess,
  onError,
  customerEmail,
  customerName
}: StripePaymentFormProps) {
  const [stripePromise] = useState(() => getStripe());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Pay with Credit Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise} options={stripeConfig}>
          <PaymentForm
            amount={amount}
            onSuccess={onSuccess}
            onError={onError}
            customerEmail={customerEmail}
            customerName={customerName}
          />
        </Elements>
      </CardContent>
    </Card>
  );
}
