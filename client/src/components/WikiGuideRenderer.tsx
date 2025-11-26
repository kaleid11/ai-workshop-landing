import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Video } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'wouter';

interface WikiGuideRendererProps {
  content: string;
  showRecordingCTA?: boolean;
}

export function WikiGuideRenderer({ content, showRecordingCTA = true }: WikiGuideRendererProps) {
  return (
    <div className="space-y-6">
      {/* Workshop Recording CTA */}
      {showRecordingCTA && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Watch the Workshop Recording
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                See this guide in action! Watch the full workshop recording where we cover this topic step-by-step.
              </p>
              <Link href="/workshops">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Access Workshop Recordings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Rendered Markdown Content */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Headings with proper hierarchy
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0 pb-3 border-b-2 border-gray-200">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-gray-900 mb-5 mt-8 pb-2 border-b border-gray-200">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-6">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-semibold text-gray-800 mb-3 mt-5">
                  {children}
                </h4>
              ),
              
              // Paragraphs with proper spacing
              p: ({ children }) => (
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {children}
                </p>
              ),
              
              // Lists with better styling
              ul: ({ children }) => (
                <ul className="space-y-2 mb-6 ml-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-6 ml-6 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 text-lg leading-relaxed">
                  {children}
                </li>
              ),
              
              // Code blocks with syntax highlighting
              code: ({ inline, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code className="bg-gray-100 text-purple-700 px-2 py-1 rounded text-base font-mono" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono mb-6" {...props}>
                    {children}
                  </code>
                );
              },
              
              // Blockquotes with accent styling
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-purple-500 bg-purple-50 pl-6 pr-4 py-4 my-6 rounded-r-lg">
                  <div className="text-gray-800 text-lg italic">
                    {children}
                  </div>
                </blockquote>
              ),
              
              // Strong/bold text
              strong: ({ children }) => (
                <strong className="font-bold text-gray-900">
                  {children}
                </strong>
              ),
              
              // Links with hover effects
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              
              // Tables with proper styling
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-100">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 px-4 py-3 text-gray-700">
                  {children}
                </td>
              ),
              
              // Horizontal rules
              hr: () => (
                <hr className="my-8 border-t-2 border-gray-200" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
