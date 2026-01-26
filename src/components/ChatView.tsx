'use client';

import { useState, useRef, useEffect } from 'react';
import { Conversation, Message, WhatsAppTemplate } from '@/types';
import { formatTime, formatDate } from '@/lib/utils';
import {
  MoreHorizontal,
  CheckCheck,
  Check,
  Clock,
  FileText,
  Bookmark,
  AlertCircle,
  User,
} from 'lucide-react';
import { TemplateModal } from './TemplateModal';
import { NotesPanel } from './NotesPanel';

interface ChatViewProps {
  conversation: Conversation | null;
  onSendMessage: (text: string) => void;
  onAddNote: (text: string) => void;
  onUpdateStatus: (id: string, status: 'open' | 'snoozed' | 'done') => void;
  onToggleContactDetails?: () => void;
  showContactDetails?: boolean;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function ChatView({
  conversation,
  onSendMessage,
  onAddNote,
  onUpdateStatus,
  onToggleContactDetails,
  showContactDetails,
}: ChatViewProps) {
  const [message, setMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectTemplate = (template: WhatsAppTemplate) => {
    setMessage(template.content);
    setShowTemplates(false);
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F0F4F8]">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <WhatsAppIcon />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">mea® Chat</h2>
          <p className="text-gray-500">Wählen Sie eine Unterhaltung aus, um zu chatten</p>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = '';

  conversation.messages.forEach((msg) => {
    const msgDate = formatDate(msg.timestamp);
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: msgDate, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F0F4F8] h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <WhatsAppIcon />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{conversation.contactName}</h2>
              <p className="text-sm text-gray-500">via mea® Apotheke</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Clock className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={() => onUpdateStatus(conversation.id, 'done')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Als erledigt markieren"
            >
              <Check className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
            {onToggleContactDetails && (
              <button
                onClick={onToggleContactDetails}
                className={`p-2 rounded-lg transition-colors ${
                  showContactDetails
                    ? 'bg-[#E8F5E9] text-[#3E8E41]'
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
                title="Kontaktdetails"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex}>
            {/* Date Separator */}
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-500 shadow-sm">
                {group.date}
              </span>
            </div>

            {/* Messages */}
            <div className="space-y-2">
              {group.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#3E8E41] focus-within:ring-2 focus-within:ring-[#3E8E41]/10 transition-all">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht schreiben..."
              rows={1}
              className="w-full px-4 py-3 bg-transparent resize-none text-sm focus:outline-none"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="flex items-center gap-1 px-2 pb-2 border-t border-gray-100">
              <button
                onClick={() => setShowNotes(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                Notiz
              </button>
              <div className="w-px h-4 bg-gray-200" />
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                WhatsApp Vorlage
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="btn-primary px-5 py-3 disabled:!bg-gray-300 text-white text-sm font-medium rounded-xl"
          >
            Senden
          </button>
        </div>
      </div>

      {/* Template Modal */}
      {showTemplates && (
        <TemplateModal
          onClose={() => setShowTemplates(false)}
          onSelect={handleSelectTemplate}
        />
      )}

      {/* Notes Panel */}
      {showNotes && (
        <NotesPanel
          notes={conversation.notes || []}
          onClose={() => setShowNotes(false)}
          onAddNote={onAddNote}
        />
      )}
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.isOutgoing;

  if (message.type === 'unsupported') {
    return (
      <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
        <div className="max-w-[70%] bg-gray-100 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Nachrichtentyp wird derzeit nicht unterstützt.</span>
          </div>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'} message-animation`}>
      <div
        className={`max-w-[70%] rounded-xl px-4 py-2.5 shadow-sm ${
          isOutgoing
            ? 'bg-[#E8F5E9] text-gray-800'
            : 'bg-white text-gray-800'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
          {isOutgoing && (
            <>
              {message.status === 'read' && (
                <CheckCheck className="w-4 h-4 text-blue-500" />
              )}
              {message.status === 'delivered' && (
                <CheckCheck className="w-4 h-4 text-gray-400" />
              )}
              {message.status === 'sent' && (
                <Check className="w-4 h-4 text-gray-400" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
