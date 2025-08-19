"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { processPayPalPayment } from '@/lib/stripe';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface PayPalPaymentFormProps {
  amount: number;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
  customerEmail: string;
}

export default function PayPalPaymentForm({
  amount,
  onSuccess,
  onError,
  customerEmail
}: PayPalPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // In a real application, this would integrate with PayPal's SDK
      const result = await processPayPalPayment(amount) as any;

      if (result.status === 'COMPLETED') {
        onSuccess(result.id);
      } else {
        setError('Payment was not completed. Please try again.');
        onError('PayPal payment was not completed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'PayPal payment failed';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          Pay with PayPal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <strong>Demo Mode:</strong> This is a demonstration. No real PayPal payment will be processed.
          </AlertDescription>
        </Alert>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-semibold text-gray-900">${amount.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-semibold text-blue-600">PayPal</span>
          </div>
        </div>

        {/* PayPal Payment Button */}
        <Button
          onClick={handlePayPalPayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing PayPal Payment...
            </>
          ) : (
            <>
              <div className="w-4 h-4 bg-white rounded mr-2 flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">P</span>
              </div>
              Pay ${amount.toFixed(2)} with PayPal
            </>
          )}
        </Button>

        {/* PayPal Benefits */}
        <div className="text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-600" />
              <span>Protected</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
