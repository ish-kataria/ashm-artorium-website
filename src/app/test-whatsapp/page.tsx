"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, MessageCircle, AlertCircle, Phone } from "lucide-react";
import whatsappService from "@/services/whatsappService";

export default function TestWhatsAppPage() {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const testWhatsApp = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      // First check configuration
      const configStatus = whatsappService.getConfigStatus();
      console.log('WhatsApp Config Status:', configStatus);

      if (!configStatus.isConfigured) {
        setTestResult({
          success: false,
          error: `Missing configuration: ${!configStatus.hasApiUrl ? 'API URL, ' : ''}${!configStatus.hasPhone ? 'Phone, ' : ''}${!configStatus.hasApiKey ? 'API Key' : ''}`
        });
        setIsTesting(false);
        return;
      }

      // Test with sample data
      const testData = {
        name: 'Test User',
        email: 'test@ashmarttorium.com',
        phone: '(555) 123-4567',
        inquiryType: 'other',
        subject: 'WhatsApp Integration Test',
        message: 'This is a test message to verify that the WhatsApp integration is working correctly with your Call Me Bot API.'
      };

      const result = await whatsappService.sendContactNotification(testData);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-green-600" />
              WhatsApp Integration Test
            </CardTitle>
            <p className="text-gray-600">
              Test your Call Me Bot API integration to ensure WhatsApp notifications are working correctly.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Configuration Status */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Configuration Status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${whatsappService.getConfigStatus().hasApiUrl ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">API URL: {whatsappService.getConfigStatus().hasApiUrl ? 'Configured' : 'Missing'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${whatsappService.getConfigStatus().hasPhone ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Phone Number: {whatsappService.getConfigStatus().hasPhone ? 'Configured' : 'Missing'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${whatsappService.getConfigStatus().hasApiKey ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">API Key: {whatsappService.getConfigStatus().hasApiKey ? 'Configured' : 'Missing'}</span>
                </div>
              </div>
            </div>

            {/* Test Button */}
            <div>
              <Button
                onClick={testWhatsApp}
                disabled={isTesting || !whatsappService.getConfigStatus().isConfigured}
                className="w-full"
                size="lg"
              >
                {isTesting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Test Message...
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4 mr-2" />
                    Send Test WhatsApp Message
                  </>
                )}
              </Button>
            </div>

            {/* Test Result */}
            {testResult && (
              <Alert className={testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                {testResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                  {testResult.success ? (
                    <>
                      <strong>Success!</strong> WhatsApp notification sent successfully. Check your phone (+1-949-739-9538) for the test message.
                    </>
                  ) : (
                    <>
                      <strong>Error:</strong> {testResult.error}
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Instructions */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-900 mb-3">Expected Result</h3>
              <p className="text-sm text-gray-600 mb-3">
                When you click the test button, you should receive a WhatsApp message on <strong>+1-949-739-9538</strong> with:
              </p>
              <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                🎨 <strong>New Ashm ARTorium Inquiry</strong><br/><br/>
                👤 <strong>Name:</strong> Test User<br/>
                📧 <strong>Email:</strong> test@ashmarttorium.com<br/>
                📱 <strong>Phone:</strong> (555) 123-4567<br/>
                🔍 <strong>Inquiry Type:</strong> ❓ Other<br/>
                📋 <strong>Subject:</strong> WhatsApp Integration Test<br/><br/>
                💬 <strong>Message:</strong><br/>
                This is a test message to verify that the WhatsApp integration is working correctly...<br/><br/>
                ⏰ <strong>Received:</strong> [Current time]
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
