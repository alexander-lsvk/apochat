import { Conversation, WhatsAppTemplate, User } from '@/types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Team mea®',
  email: 'team@meineapotheke.de',
  organization: 'mea® - meine apotheke',
};

export const whatsAppTemplates: WhatsAppTemplate[] = [
  {
    id: 'welcome',
    name: 'Willkommensnachricht',
    category: 'Begrüßung',
    content: `Herzlich Willkommen bei mea® - meine apotheke! 💚

Vielen Dank für Ihre Nachricht.
Einer unserer Mitarbeiter wird sich in Kürze persönlich um Ihr Anliegen kümmern.

Informationen zum Datenschutz finden Sie unter https://meineapotheke.de/datenschutz

Freundliche Grüße,
Ihr mea® Team 💚`,
    variables: [],
  },
  {
    id: 'order-ready',
    name: 'Bestellung bereit',
    category: 'Bestellung',
    content: `Guten Tag {{name}}! 👋

Ihre Bestellung ist jetzt zur Abholung bereit. 📦

Sie können Ihre Medikamente während unserer Öffnungszeiten abholen:
Mo-Fr: 8:00-18:30 Uhr
Sa: 8:00-13:00 Uhr

Bei Fragen erreichen Sie uns jederzeit hier.

Freundliche Grüße,
Ihr mea® Team 💚`,
    variables: ['name'],
  },
  {
    id: 'prescription-reminder',
    name: 'Rezept Erinnerung',
    category: 'Erinnerung',
    content: `Hallo {{name}},

Ihr Rezept für {{medication}} ist bald abgelaufen. 📋

Möchten Sie, dass wir ein neues Rezept bei Ihrem Arzt anfragen?

Antworten Sie einfach mit "Ja" und wir kümmern uns darum!

Freundliche Grüße,
Ihr mea® Team 💚`,
    variables: ['name', 'medication'],
  },
  {
    id: 'availability-check',
    name: 'Verfügbarkeitsanfrage',
    category: 'Service',
    content: `Hallo {{name}},

Vielen Dank für Ihre Anfrage bezüglich {{product}}. ✨

{{status}}

Haben Sie weitere Fragen? Wir sind gerne für Sie da!

Freundliche Grüße,
Ihr mea® Team 💚`,
    variables: ['name', 'product', 'status'],
  },
  {
    id: 'feedback-request',
    name: 'Feedback Anfrage',
    category: 'Feedback',
    content: `Liebe/r {{name}},

Vielen Dank, dass Sie mea® nutzen! 🌟

Ihre Meinung ist uns wichtig. Wie war Ihre Erfahrung mit unserem Service?

Wir freuen uns über Ihr Feedback!

Freundliche Grüße,
Ihr mea® Team 💚`,
    variables: ['name'],
  },
  {
    id: 'offers',
    name: 'Unsere Angebote',
    category: 'Marketing',
    content: `Liebe Kundin, Lieber Kunde,

Vielen Dank für Ihr Interesse an unseren exklusiven Angeboten und Neuigkeiten aus der Apotheke! 🎁

Damit wir Sie monatlich auf dem Laufenden halten, fehlt nur noch ein letzter Schritt:
Bitte bestätigen Sie mit "Ja" & schon kann es losgehen. ✅

Freundliche Grüße,
Ihr mea® Team 💚`,
    variables: [],
  },
];

export const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Max Mustermann',
    contactPhone: '+49 176 12345678',
    lastMessage: 'Vielen Dank für die schnelle Antwort!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
    status: 'open',
    labels: ['Neukunde'],
    messages: [
      {
        id: 'msg-1-1',
        text: 'Hallo, ich hätte gerne Informationen zu Ihren Angeboten.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isOutgoing: false,
      },
      {
        id: 'msg-1-2',
        text: `Herzlich Willkommen bei mea® - meine apotheke! 💚

Vielen Dank für Ihre Nachricht.
Einer unserer Mitarbeiter wird sich in Kürze persönlich um Ihr Anliegen kümmern.

Informationen zum Datenschutz finden Sie unter https://meineapotheke.de/datenschutz

Freundliche Grüße,
Ihr mea® Team 💚`,
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
        isOutgoing: true,
        status: 'delivered',
      },
      {
        id: 'msg-1-3',
        text: 'Super, ich interessiere mich für Vitaminpräparate.',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isOutgoing: false,
      },
      {
        id: 'msg-1-4',
        text: 'Vielen Dank für die schnelle Antwort!',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isOutgoing: false,
      },
    ],
    notes: [
      {
        id: 'note-1-1',
        text: 'Interesse an Vitamin D und Magnesium. Telefonische Rücksprache vereinbaren.',
        createdAt: new Date(Date.now() - 1000 * 60 * 20),
        author: 'Anna M.',
      },
    ],
  },
  {
    id: 'conv-2',
    contactName: 'Lisa Schmidt',
    contactPhone: '+49 151 98765432',
    lastMessage: 'Ist meine Bestellung schon fertig?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    unreadCount: 1,
    status: 'open',
    labels: ['Bestellung', 'Stammkunde'],
    messages: [
      {
        id: 'msg-2-1',
        text: 'Guten Tag, ich habe gestern eine Bestellung aufgegeben.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        isOutgoing: false,
      },
      {
        id: 'msg-2-2',
        text: 'Können Sie mir sagen, wann ich sie abholen kann?',
        timestamp: new Date(Date.now() - 1000 * 60 * 119),
        isOutgoing: false,
      },
      {
        id: 'msg-2-3',
        text: `Guten Tag Frau Schmidt! 👋

Vielen Dank für Ihre Anfrage. Wir prüfen den Status Ihrer Bestellung und melden uns umgehend bei Ihnen.

Freundliche Grüße,
Ihr mea® Team 💚`,
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
        isOutgoing: true,
        status: 'read',
      },
      {
        id: 'msg-2-4',
        text: 'Ist meine Bestellung schon fertig?',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isOutgoing: false,
      },
    ],
    notes: [],
  },
  {
    id: 'conv-3',
    contactName: 'Thomas Weber',
    contactPhone: '+49 170 55544433',
    lastMessage: 'Danke, bis morgen dann!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    unreadCount: 0,
    status: 'done',
    labels: ['Abgeschlossen'],
    messages: [
      {
        id: 'msg-3-1',
        text: 'Haben Sie das Medikament XY vorrätig?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        isOutgoing: false,
      },
      {
        id: 'msg-3-2',
        text: `Hallo Herr Weber,

Ja, das Medikament ist bei uns vorrätig. Sie können es jederzeit während unserer Öffnungszeiten abholen.

Mo-Fr: 8:00-18:30 Uhr
Sa: 8:00-13:00 Uhr

Freundliche Grüße,
Ihr mea® Team 💚`,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5),
        isOutgoing: true,
        status: 'read',
      },
      {
        id: 'msg-3-3',
        text: 'Danke, bis morgen dann!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        isOutgoing: false,
      },
    ],
    notes: [],
  },
  {
    id: 'conv-4',
    contactName: 'Emma Müller',
    contactPhone: '+49 172 11122233',
    lastMessage: 'Erinnerung an nächste Woche gesetzt',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    status: 'snoozed',
    labels: ['Erinnerung'],
    messages: [
      {
        id: 'msg-4-1',
        text: 'Ich brauche nächste Woche ein neues Rezept.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        isOutgoing: false,
      },
      {
        id: 'msg-4-2',
        text: `Guten Tag Frau Müller,

Notiert! Wir erinnern Sie nächste Woche an Ihr Rezept.

Freundliche Grüße,
Ihr mea® Team 💚`,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isOutgoing: true,
        status: 'read',
      },
    ],
    notes: [
      {
        id: 'note-4-1',
        text: 'Rezepterinnerung für nächsten Montag',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        author: 'Maria K.',
      },
    ],
  },
  {
    id: 'conv-5',
    contactName: '+49 176 99988877',
    contactPhone: '+49 176 99988877',
    lastMessage: 'Nachricht wird nicht unterstützt',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 1,
    status: 'open',
    labels: [],
    messages: [
      {
        id: 'msg-5-1',
        text: '',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isOutgoing: false,
        type: 'unsupported',
      },
      {
        id: 'msg-5-2',
        text: `Herzlich Willkommen bei mea® - meine apotheke! 💚

Vielen Dank für Ihre Nachricht.
Einer unserer Mitarbeiter wird sich in Kürze persönlich um Ihr Anliegen kümmern.

Informationen zum Datenschutz finden Sie unter https://meineapotheke.de/datenschutz

Freundliche Grüße,
Ihr mea® Team 💚`,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000),
        isOutgoing: true,
        status: 'delivered',
      },
    ],
    notes: [],
  },
];
