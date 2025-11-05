import React from 'react';

export function EducationalPopup({ content, onClose }) {
  if (!content) return null;

  return (
    <div className="ui-panel max-w-2xl max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">{content.title}</h2>
          {content.category && (
            <span className="text-sm bg-green-500 bg-opacity-20 text-green-400 px-2 py-1 rounded">
              {content.category}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-4"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {content.image && (
        <div className="mb-6">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <div className="text-gray-300 leading-relaxed mb-6">
          {content.description}
        </div>

        {content.facts && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-400 mb-3">Key Facts</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {content.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        )}

        {content.impacts && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Environmental Impact</h3>
            <div className="text-gray-300 space-y-2">
              {content.impacts.map((impact, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-400 mt-1">→</span>
                  <span>{impact}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.actions && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">How You Can Help</h3>
            <div className="text-gray-300 space-y-2">
              {content.actions.map((action, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.sources && (
          <div className="mt-8 pt-6 border-t border-gray-600">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Sources</h4>
            <ul className="text-xs text-gray-500 space-y-1">
              {content.sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-600 flex justify-between items-center">
        <p className="text-sm text-gray-400">
          Learn more about environmental conservation
        </p>
        <button
          onClick={onClose}
          className="btn btn-primary"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}