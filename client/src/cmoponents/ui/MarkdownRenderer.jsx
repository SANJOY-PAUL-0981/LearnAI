import React from "react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

// Code block component for <pre><code>
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const text = String(children).trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (inline) {
    return (
      <code className="bg-gray-800 text-green-300 px-1 rounded">
        {text}
      </code>
    );
  }

  return (
    <div className="relative bg-[#27263b] text-white p-4 rounded-md overflow-x-auto my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
      >
        {copied ? <FiCheck /> : <FiCopy />}
      </button>
      <pre className="text-sm leading-relaxed whitespace-pre-wrap">
        <code className={className} {...props}>{text}</code>
      </pre>
    </div>
  );
};

const MarkdownRenderer = ({ content = "" }) => {
  const cleanMarkdown = DOMPurify.sanitize(content);

  return (
    <ReactMarkdown
      children={cleanMarkdown}
      components={{
        h1: ({ children }) => (
          <h1 className="text-white text-3xl font-bold my-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-white text-2xl font-bold my-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-white text-2xl font-bold my-2">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-white text-xl font-semibold my-2">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-white text-base mb-2">{children}</p>
        ),
        code: CodeBlock,
        li: ({ children }) => (
          <li className="list-disc ml-5 text-white text-base">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="text-white text-lg font-bold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-gray-300 italic">{children}</em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-3">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {children}
          </a>
        ),
      }}
    />
  );
};

export default MarkdownRenderer;
