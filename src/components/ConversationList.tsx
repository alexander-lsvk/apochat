'use client';

import { Conversation, TabFilter } from '@/types';
import {
  Search,
  Edit3,
  MoreHorizontal,
  Filter,
  MessageCircle,
} from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  activeTab: TabFilter;
  searchQuery: string;
  onSelectConversation: (id: string) => void;
  onTabChange: (tab: TabFilter) => void;
  onSearchChange: (query: string) => void;
  tabCounts: { open: number; snoozed: number; done: number };
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function ConversationList({
  conversations,
  activeConversationId,
  activeTab,
  searchQuery,
  onSelectConversation,
  onTabChange,
  onSearchChange,
  tabCounts,
}: ConversationListProps) {
  const tabs: { key: TabFilter; label: string }[] = [
    { key: 'open', label: 'Offen' },
    { key: 'snoozed', label: 'Später' },
    { key: 'done', label: 'Erledigt' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">Alle Unterhaltungen</h1>
          <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 bg-[rgb(155,205,55)] hover:brightness-95 text-white rounded-lg transition-all">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? 'text-[#3E8E41]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tabCounts[tab.key] > 0 && (
              <span className="ml-1.5 text-xs text-gray-400">
                ({tabCounts[tab.key]})
              </span>
            )}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(60,140,75)]" />
            )}
          </button>
        ))}
      </div>

      {/* Sort & Filter */}
      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>Neueste</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Unterhaltungen suchen..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">Keine Unterhaltungen gefunden</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversationId}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-all ${
        isActive
          ? 'conversation-active'
          : 'hover:bg-gray-50'
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#F0FADF] flex items-center justify-center">
          <WhatsAppIcon />
        </div>
        {conversation.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[rgb(155,205,55)] text-white text-xs font-medium rounded-full flex items-center justify-center">
            {conversation.unreadCount}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm ${conversation.unreadCount > 0 ? 'font-semibold' : 'font-medium'} text-gray-900 truncate`}>
            {conversation.contactName}
          </span>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
            {formatDistanceToNow(conversation.lastMessageTime)}
          </span>
        </div>

        <p className={`text-sm ${conversation.unreadCount > 0 ? 'text-gray-800' : 'text-gray-500'} truncate`}>
          {conversation.lastMessage || 'Noch keine Nachrichten'}
        </p>

        {/* Tags */}
        {conversation.labels && conversation.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {conversation.labels.map((label) => (
              <span
                key={label}
                className={`text-xs px-2 py-0.5 rounded-full ${
                  label === 'Terminanfrage'
                    ? 'bg-orange-100 text-orange-700'
                    : label === 'Bestellung'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-[#F0FADF] text-[#2D6A30]'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
