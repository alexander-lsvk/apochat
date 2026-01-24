export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'template' | 'image' | 'unsupported';
}

export interface Conversation {
  id: string;
  contactName: string;
  contactPhone: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'open' | 'snoozed' | 'done';
  labels?: string[];
  messages: Message[];
  notes?: Note[];
}

export interface Note {
  id: string;
  text: string;
  createdAt: Date;
  author: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  variables?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  organization: string;
}

export type TabFilter = 'open' | 'snoozed' | 'done';
