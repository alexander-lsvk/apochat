'use client';

import { useState } from 'react';
import { WhatsAppTemplate } from '@/types';
import { whatsAppTemplates } from '@/data/mockData';
import { X, Search, Bookmark, ArrowRight } from 'lucide-react';

interface TemplateModalProps {
  onClose: () => void;
  onSelect: (template: WhatsAppTemplate) => void;
}

export function TemplateModal({ onClose, onSelect }: TemplateModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(whatsAppTemplates.map((t) => t.category)));

  const filteredTemplates = whatsAppTemplates.filter((template) => {
    const matchesSearch =
      searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#3E8E41]" />
            <h2 className="text-lg font-semibold text-gray-900">WhatsApp Vorlagen</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Vorlagen suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                !selectedCategory
                  ? 'mea-gradient text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'mea-gradient text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Keine Vorlagen gefunden</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => onSelect(template)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: WhatsAppTemplate;
  onSelect: () => void;
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={onSelect}
      className="group p-4 border border-gray-200 rounded-xl hover:border-[#3E8E41] hover:shadow-md cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
          <span className="inline-flex items-center px-2 py-0.5 text-xs bg-[#E8F5E9] text-[#2D6A30] rounded-full">
            {template.category}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 mea-gradient rounded-full flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 line-clamp-3 whitespace-pre-wrap">
        {template.content.substring(0, 150)}...
      </p>
      {template.variables && template.variables.length > 0 && (
        <div className="mt-2 flex items-center gap-1 flex-wrap">
          <span className="text-xs text-gray-400">Variablen:</span>
          {template.variables.map((v) => (
            <span
              key={v}
              className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded"
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
