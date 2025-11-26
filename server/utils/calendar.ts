/**
 * Generate .ics calendar invite file content
 */
export function generateICSFile(params: {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  organizerEmail?: string;
  attendeeEmail?: string;
}): string {
  const { title, description, location, startTime, endTime, organizerEmail, attendeeEmail } = params;

  // Format dates to iCalendar format (YYYYMMDDTHHMMSSZ)
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const now = new Date();
  const dtstamp = formatDate(now);
  const dtstart = formatDate(startTime);
  const dtend = formatDate(endTime);

  // Generate unique ID
  const uid = `${Date.now()}@techhorizonacademy.com`;

  // Build ICS content
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tech Horizon Academy//Workshop Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
  ];

  if (organizerEmail) {
    lines.push(`ORGANIZER;CN=Tech Horizon Academy:mailto:${organizerEmail}`);
  }

  if (attendeeEmail) {
    lines.push(`ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${attendeeEmail}`);
  }

  lines.push(
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Workshop reminder - 24 hours',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Workshop starting in 1 hour',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  );

  return lines.join('\r\n');
}

/**
 * Generate Google Calendar add link
 */
export function generateGoogleCalendarLink(params: {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}): string {
  const { title, description, location, startTime, endTime } = params;

  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dates = `${formatDate(startTime)}/${formatDate(endTime)}`;

  const params_obj = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location: location,
    dates: dates,
  });

  return `https://calendar.google.com/calendar/render?${params_obj.toString()}`;
}
