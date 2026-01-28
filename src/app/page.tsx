'use client';

import { useState } from 'react';
import { ConversationList } from '@/components/ConversationList';
import { ChatView } from '@/components/ChatView';
import { ContactDetails } from '@/components/ContactDetails';
import { useChat } from '@/hooks/useChat';
import { Menu, Info, X, ChevronDown, Building2 } from 'lucide-react';

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

  const navItems = [
    { key: 'bestellungen', label: 'Bestellungen', active: false },
    { key: 'kunden', label: 'Kunden', active: false },
    { key: 'termine', label: 'Termine', active: false },
    { key: 'chat', label: 'Chat', active: true },
  ];

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Cockpit Header */}
      <header className="hidden lg:flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src="/mea.webp"
            alt="mea meine apotheke"
            className="h-10 object-contain"
          />
        </div>

        {/* Right: Navigation + Pharmacy Selector */}
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`relative py-2 text-base font-medium transition-colors ${item.active
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {item.label}
                {item.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(60,140,75)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Pharmacy Selector */}
          <button className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Building2 className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Muster Apotheke</p>
              <p className="text-xs text-gray-500">Hauptstr. 50</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <img src="/mea.webp" alt="mea" className="h-8 object-contain" />
          <span className="font-medium text-gray-900">Chat</span>
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

      {/* Main Content */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="h-full flex flex-col lg:px-64 lg:py-16">
          {/* Page Title */}
          <h1 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">Chat</h1>

          {/* Chat Container */}
          <div className="flex-1 flex overflow-hidden border border-gray-200 lg:rounded-lg">
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
                border-r border-gray-100
                shadow-lg lg:shadow-none
              `}
            >
              <ConversationList
                conversations={conversations}
                activeConversationId={activeConversation?.id || null}
                activeTab={activeTab}
                searchQuery={searchQuery}
                onSelectConversation={(id) => {
                  selectConversation(id);
                  if (window.innerWidth < 1024) {
                    setShowSidebar(false);
                  }
                }}
                onTabChange={setActiveTab}
                onSearchChange={setSearchQuery}
                tabCounts={tabCounts}
              />
            </div>

            {/* Mobile Overlay */}
            {showSidebar && (
              <div
                className="lg:hidden fixed inset-0 z-30 bg-black/30"
                onClick={() => setShowSidebar(false)}
              />
            )}

            {/* Chat Area */}
            <div className="flex-1 flex pt-14 lg:pt-0 min-w-0">
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
