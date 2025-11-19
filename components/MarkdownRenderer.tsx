import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-body text-sm md:text-base text-slate-300">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-mbm-gold mb-4 mt-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-white mb-3 mt-6 border-b border-slate-700 pb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-white mb-2 mt-4" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-mbm-gold" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1 text-slate-300" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1 text-slate-300" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-mbm-purple pl-4 italic text-slate-400 my-4 bg-slate-900/50 py-2 rounded-r" {...props} />,
          code: ({node, ...props}) => <code className="bg-slate-800 text-mbm-gold px-1 py-0.5 rounded font-mono text-sm" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;