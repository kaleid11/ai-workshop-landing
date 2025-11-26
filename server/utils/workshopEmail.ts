import { Resend } from 'resend';
import { generateICSFile } from './calendar';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send workshop booking confirmation email with calendar invite
 */
export async function sendWorkshopBookingEmail(params: {
  to: string;
  userName: string;
  workshopTitle: string;
  workshopDescription: string;
  scheduledAt: Date;
  durationMinutes: number;
  googleMeetUrl?: string;
}) {
  const { to, userName, workshopTitle, workshopDescription, scheduledAt, durationMinutes, googleMeetUrl } = params;

  const endTime = new Date(scheduledAt.getTime() + durationMinutes * 60000);

  // Generate calendar invite
  const icsContent = generateICSFile({
    title: workshopTitle,
    description: workshopDescription,
    location: googleMeetUrl || 'Google Meet link will be sent closer to the workshop date',
    startTime: scheduledAt,
    endTime: endTime,
    organizerEmail: process.env.OWNER_EMAIL || 'workshops@techhorizonacademy.com',
    attendeeEmail: to,
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .workshop-details {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #f97316;
          }
          .detail-row {
            margin: 12px 0;
            display: flex;
            align-items: flex-start;
          }
          .detail-label {
            font-weight: 600;
            color: #f97316;
            min-width: 120px;
          }
          .button {
            display: inline-block;
            background: #f97316;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 0;
          }
          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">🎉 Workshop Booking Confirmed!</h1>
        </div>
        
        <div class="content">
          <p>Hi ${userName},</p>
          
          <p>Great news! Your workshop booking has been confirmed. We're excited to have you join us!</p>
          
          <div class="workshop-details">
            <h2 style="margin-top: 0; color: #f97316;">${workshopTitle}</h2>
            <p style="color: #6b7280; margin-bottom: 20px;">${workshopDescription}</p>
            
            <div class="detail-row">
              <span class="detail-label">📅 Date:</span>
              <span>${scheduledAt.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">🕐 Time:</span>
              <span>${scheduledAt.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">⏱️ Duration:</span>
              <span>${durationMinutes} minutes</span>
            </div>
            
            ${googleMeetUrl ? `
            <div class="detail-row">
              <span class="detail-label">🎥 Join Link:</span>
              <span><a href="${googleMeetUrl}" style="color: #f97316;">${googleMeetUrl}</a></span>
            </div>
            ` : `
            <div class="detail-row">
              <span class="detail-label">🎥 Join Link:</span>
              <span>Will be sent 24 hours before the workshop</span>
            </div>
            `}
          </div>
          
          <p><strong>What's Next?</strong></p>
          <ul>
            <li>Add this workshop to your calendar using the attached .ics file</li>
            <li>You'll receive a reminder email 24 hours before the workshop</li>
            ${!googleMeetUrl ? '<li>The Google Meet link will be sent closer to the workshop date</li>' : ''}
            <li>Prepare any questions you'd like to ask during the session</li>
          </ul>
          
          <center>
            <a href="https://techhorizonacademy.com/my-bookings" class="button">
              View My Bookings
            </a>
          </center>
          
          <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
            <strong>Need to cancel?</strong> You can cancel your booking and get your workshop token refunded from your <a href="https://techhorizonacademy.com/my-bookings" style="color: #f97316;">My Bookings</a> page.
          </p>
        </div>
        
        <div class="footer">
          <p>Tech Horizon Academy - AI Automation Workshops</p>
          <p>Questions? Reply to this email or visit our <a href="https://techhorizonacademy.com" style="color: #f97316;">website</a></p>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Tech Horizon Academy <workshops@techhorizonacademy.com>',
      to: [to],
      subject: `Workshop Confirmed: ${workshopTitle}`,
      html: emailHtml,
      attachments: [
        {
          filename: 'workshop-invite.ics',
          content: Buffer.from(icsContent).toString('base64'),
        },
      ],
    });

    return result;
  } catch (error) {
    console.error('Failed to send workshop booking email:', error);
    throw error;
  }
}

/**
 * Send workshop reminder email (24 hours before)
 */
export async function sendWorkshopReminderEmail(params: {
  to: string;
  userName: string;
  workshopTitle: string;
  scheduledAt: Date;
  googleMeetUrl: string;
}) {
  const { to, userName, workshopTitle, scheduledAt, googleMeetUrl } = params;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .button {
            display: inline-block;
            background: #f97316;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">⏰ Workshop Tomorrow!</h1>
        </div>
        
        <div class="content">
          <p>Hi ${userName},</p>
          
          <p style="font-size: 18px;"><strong>Your workshop is starting in 24 hours!</strong></p>
          
          <p><strong>${workshopTitle}</strong></p>
          <p>📅 ${scheduledAt.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p>🕐 ${scheduledAt.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
          })}</p>
          
          <center>
            <a href="${googleMeetUrl}" class="button">
              🎥 Join Google Meet
            </a>
          </center>
          
          <p><strong>Preparation Tips:</strong></p>
          <ul>
            <li>Test your microphone and camera before the workshop</li>
            <li>Have a notebook ready for taking notes</li>
            <li>Prepare any questions you'd like to ask</li>
            <li>Join 5 minutes early to ensure everything works</li>
          </ul>
          
          <p>See you tomorrow!</p>
        </div>
        
        <div class="footer">
          <p>Tech Horizon Academy - AI Automation Workshops</p>
        </div>
      </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Tech Horizon Academy <workshops@techhorizonacademy.com>',
      to: [to],
      subject: `Reminder: ${workshopTitle} - Tomorrow!`,
      html: emailHtml,
    });

    return result;
  } catch (error) {
    console.error('Failed to send workshop reminder email:', error);
    throw error;
  }
}
