'use client';

import { useState } from 'react';
import { ConversationList } from '@/components/ConversationList';
import { ChatView } from '@/components/ChatView';
import { ContactDetails } from '@/components/ContactDetails';
import { useChat } from '@/hooks/useChat';
import { Menu, Info, X } from 'lucide-react';

export default function Home() {
  const {
    conversations,
    allConversations,
    activeConversation,
    activeTab,
    searchQuery,
    setActiveTab,
    setSearchQuery,
    selectConversation,
    sendMessage,
    addNote,
    updateConversationStatus,
  } = useChat();

  const [showSidebar, setShowSidebar] = useState(true);
  const [showContactDetails, setShowContactDetails] = useState(false);

  // Calculate tab counts
  const tabCounts = {
    open: allConversations.filter((c) => c.status === 'open').length,
    snoozed: allConversations.filter((c) => c.status === 'snoozed').length,
    done: allConversations.filter((c) => c.status === 'done').length,
  };

  return (
    <div className="h-screen flex bg-[#F5F7FA] overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <MeaLogo />
          <span className="font-semibold text-[#3E8E41]">mea® Chat</span>
        </div>
        {activeConversation && (
          <button
            onClick={() => setShowContactDetails(!showContactDetails)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          z-40
          w-80 lg:w-[340px]
          h-full
          pt-14 lg:pt-0
          transition-transform duration-300 ease-in-out
          bg-white
          shadow-lg lg:shadow-none
        `}
      >
        {/* Desktop Header with Logo */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <MeaLogo />
          <div>
            <h1 className="font-semibold text-gray-900">mea® Chat</h1>
            <p className="text-xs text-gray-500">WhatsApp Business</p>
          </div>
        </div>
        <div className="h-[calc(100%-64px)] lg:h-[calc(100%-73px)]">
          <ConversationList
            conversations={conversations}
            activeConversationId={activeConversation?.id || null}
            activeTab={activeTab}
            searchQuery={searchQuery}
            onSelectConversation={(id) => {
              selectConversation(id);
              // Close sidebar on mobile after selection
              if (window.innerWidth < 1024) {
                setShowSidebar(false);
              }
            }}
            onTabChange={setActiveTab}
            onSearchChange={setSearchQuery}
            tabCounts={tabCounts}
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col pt-14 lg:pt-0 min-w-0">
        <div className="flex-1 flex h-full">
          <ChatView
            conversation={activeConversation}
            onSendMessage={sendMessage}
            onAddNote={addNote}
            onUpdateStatus={updateConversationStatus}
            onToggleContactDetails={() => setShowContactDetails(!showContactDetails)}
            showContactDetails={showContactDetails}
          />

          {/* Contact Details Panel (Desktop) */}
          {showContactDetails && activeConversation && (
            <div className="hidden lg:block">
              <ContactDetails
                conversation={activeConversation}
                onClose={() => setShowContactDetails(false)}
              />
            </div>
          )}
        </div>

      </div>

      {/* Mobile Contact Details */}
      {showContactDetails && activeConversation && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white pt-14">
          <ContactDetails
            conversation={activeConversation}
            onClose={() => setShowContactDetails(false)}
          />
        </div>
      )}
    </div>
  );
}

function MeaLogo() {
  return (
    <div className="w-10 h-10 mea-gradient rounded-lg flex items-center justify-center">
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="white">
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          mea
        </text>
      </svg>
    </div>
  );
}
