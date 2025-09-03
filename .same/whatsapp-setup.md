# WhatsApp Integration Setup Guide

## Overview
This setup enables WhatsApp notifications when someone submits the contact form on your Ashm ARTorium website using the Call Me Bot API.

## Setup Steps

### 1. Get Call Me Bot API Access
1. Visit: https://www.callmebot.com/blog/free-api-whatsapp-messages/
2. Follow their WhatsApp setup instructions
3. Add the Call Me Bot contact to your WhatsApp
4. Send the activation message to get your API key
5. Save your API key - you'll need it for the environment variables

### 2. Configure Environment Variables
Create a `.env.local` file in your project root with:

```env
# Call Me Bot API Configuration
NEXT_PUBLIC_CALLMEBOT_API_URL=https://api.callmebot.com/whatsapp.php
NEXT_PUBLIC_WHATSAPP_PHONE=your_phone_number_here
NEXT_PUBLIC_CALLMEBOT_API_KEY=your_api_key_here
```

**Important Notes:**
- Phone number should include country code WITH + sign (e.g., +17636077480 for +1-763-607-7480)
- Keep your API key secure
- The API URL might vary depending on Call Me Bot's current endpoint

### 3. Test the Integration
1. Deploy your changes
2. Submit a test form on your website
3. Check that you receive a WhatsApp message

## Message Format
When someone submits a contact form, you'll receive a WhatsApp message like:

```
🎨 New Ashm ARTorium Inquiry

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: (555) 123-4567
🔍 Inquiry Type: 🖼️ Artwork Purchase/Viewing
📋 Subject: Interested in landscape painting

💬 Message:
I saw your beautiful landscape painting on the website and would love to know more about pricing and availability.

⏰ Received: 12/1/2024, 2:30 PM
```

## Troubleshooting

### No WhatsApp messages received?
1. Check your environment variables are set correctly
2. Verify your Call Me Bot API key is active
3. Make sure your phone number format is correct (no + sign)
4. Check browser console for error messages

### API key expired?
1. Re-follow the Call Me Bot setup process
2. Update your environment variables with the new API key
3. Redeploy your website

### Alternative API endpoints?
If Call Me Bot changes their API, you might need to:
1. Update the `NEXT_PUBLIC_CALLMEBOT_API_URL` environment variable
2. Modify the `whatsappService.ts` file if the request format changes

## Security Notes
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Keep your API key secure and don't share it publicly
- Consider implementing rate limiting for production use
- The current setup is suitable for personal/small business use

## Support
If you need help with the setup, check:
1. Call Me Bot documentation: https://www.callmebot.com/
2. The browser console for error messages
3. Test the API directly using their documentation
