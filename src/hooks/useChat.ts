'use client';

import { useState, useCallback } from 'react';
import { Conversation, Message, Note, TabFilter } from '@/types';
import { initialConversations } from '@/data/mockData';

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    initialConversations[0]?.id || null
  );
  const [activeTab, setActiveTab] = useState<TabFilter>('open');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const filteredConversations = conversations.filter((conv) => {
    const matchesTab = conv.status === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.contactPhone.includes(searchQuery) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const sendMessage = useCallback(
    (text: string) => {
      if (!activeConversationId || !text.trim()) return;

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        text: text.trim(),
        timestamp: new Date(),
        isOutgoing: true,
        status: 'sent',
        type: 'text',
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: text.trim(),
                lastMessageTime: new Date(),
              }
            : conv
        )
      );

      // Simulate status change after a short delay
      setTimeout(() => {
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === activeConversationId
              ? {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
                  ),
                }
              : conv
          )
        );
      }, 1000);
    },
    [activeConversationId]
  );

  const addNote = useCallback(
    (text: string) => {
      if (!activeConversationId || !text.trim()) return;

      const newNote: Note = {
        id: `note-${Date.now()}`,
        text: text.trim(),
        createdAt: new Date(),
        author: 'Sie',
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                notes: [...(conv.notes || []), newNote],
              }
            : conv
        )
      );
    },
    [activeConversationId]
  );

  const updateConversationStatus = useCallback(
    (conversationId: string, status: 'open' | 'snoozed' | 'done') => {
      setConversations((prev) =>
        prev.map((conv) => (conv.id === conversationId ? { ...conv, status } : conv))
      );
    },
    []
  );

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv))
    );
  }, []);

  const selectConversation = useCallback(
    (conversationId: string) => {
      setActiveConversationId(conversationId);
      markAsRead(conversationId);
    },
    [markAsRead]
  );

  return {
    conversations: filteredConversations,
    allConversations: conversations,
    activeConversation,
    activeConversationId,
    activeTab,
    searchQuery,
    setActiveTab,
    setSearchQuery,
    selectConversation,
    sendMessage,
    addNote,
    updateConversationStatus,
    markAsRead,
  };
}
