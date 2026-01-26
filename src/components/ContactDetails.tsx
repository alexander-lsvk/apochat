'use client';

import { Conversation } from '@/types';
import {
  X,
  Phone,
  Mail,
  Tag,
  Clock,
  ExternalLink,
  MessageSquare,
  Calendar,
  User,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ContactDetailsProps {
  conversation: Conversation;
  onClose: () => void;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const statusLabels: Record<string, string> = {
  open: 'Offen',
  snoozed: 'Später',
  done: 'Erledigt',
};

export function ContactDetails({ conversation, onClose }: ContactDetailsProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Kontaktdetails</h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile */}
        <div className="p-4 text-center border-b border-gray-100">
          <div className="w-20 h-20 bg-[#F0FADF] rounded-full flex items-center justify-center mx-auto mb-3">
            <WhatsAppIcon />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">
            {conversation.contactName}
          </h4>
          <p className="text-sm text-gray-500">{conversation.contactPhone}</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <Phone className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <Mail className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <ExternalLink className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="p-4 border-b border-gray-100">
          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Kurzinfo
          </h5>
          <div className="space-y-3">
            <InfoRow icon={MessageSquare} label="Kanal" value="WhatsApp" />
            <InfoRow
              icon={Calendar}
              label="Erstkontakt"
              value={formatDate(conversation.messages[0]?.timestamp || new Date())}
            />
            <InfoRow
              icon={Clock}
              label="Status"
              value={
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                    conversation.status === 'open'
                      ? 'bg-green-100 text-green-700'
                      : conversation.status === 'snoozed'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {statusLabels[conversation.status]}
                </span>
              }
            />
            <InfoRow
              icon={User}
              label="Zugewiesen"
              value="Nicht zugewiesen"
            />
          </div>
        </div>

        {/* Labels */}
        <div className="p-4 border-b border-gray-100">
          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Labels
          </h5>
          {conversation.labels && conversation.labels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {conversation.labels.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#F0FADF] text-[#2D6A30] rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {label}
                </span>
              ))}
              <button className="inline-flex items-center px-2.5 py-1 text-xs text-gray-500 border border-dashed border-gray-300 rounded-full hover:border-[#3E8E41] hover:text-[#3E8E41] transition-colors">
                + Label hinzufügen
              </button>
            </div>
          ) : (
            <button className="inline-flex items-center px-2.5 py-1 text-xs text-gray-500 border border-dashed border-gray-300 rounded-full hover:border-[#3E8E41] hover:text-[#3E8E41] transition-colors">
              + Label hinzufügen
            </button>
          )}
        </div>

        {/* Internal Notes */}
        <div className="p-4">
          <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Interne Notizen
          </h5>
          {conversation.notes && conversation.notes.length > 0 ? (
            <div className="space-y-2">
              {conversation.notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-amber-50 border border-amber-100 rounded-lg"
                >
                  <p className="text-sm text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{note.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Noch keine Notizen</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-500">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  );
}
