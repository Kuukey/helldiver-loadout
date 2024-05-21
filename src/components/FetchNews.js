import React, { useEffect, useState, useMemo } from 'react';
import DOMPurify from 'dompurify';

const MESSAGE_CACHE_KEY = 'helldivers_messages';

// Function to parse and process the message content
const processMessage = (message) => {
  // Replace <i=3> with <h1 class="news-header"> and </i> with </h1>
  let processedContent = message.replace(/<i=3>/g, '<h1 class="news-header">');
  processedContent = processedContent.replace(/<\/i>/g, '</h1>');
  // Replace '\n' with <br> tags
  processedContent = processedContent.replace(/\n/g, '<br>');

  // Create a temporary div to manipulate the content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = processedContent;

  // Function to wrap text nodes in <span class="news-text">
  const wrapTextNodes = (node) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
        // Wrap text nodes in <span> unless they are within or adjacent to an <h1>
        if (!child.parentElement.closest('h1')) {
          const span = document.createElement('span');
          span.className = 'news-text';
          span.textContent = child.textContent;
          child.replaceWith(span);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapTextNodes(child);
      }
    });
  };

  wrapTextNodes(tempDiv);

  return tempDiv.innerHTML;
};

// Component to render a single message
const Message = ({ content }) => {
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(processMessage(content));
  }, [content]);

  return (
    <div className="news-block-text">
      {/* Render the processed HTML content */}
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

// Main component to fetch and render messages
const FetchNews = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Check if messages exist in the local storage
        const cachedMessages = localStorage.getItem(MESSAGE_CACHE_KEY);
        if (cachedMessages) {
          setMessages(JSON.parse(cachedMessages));
          setLoading(false);
        } else {
          const response = await fetch('https://api.helldivers2.dev/raw/api/NewsFeed/801');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMessages(data);
          // Store messages in local storage
          localStorage.setItem(MESSAGE_CACHE_KEY, JSON.stringify(data));
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Get the last message from the fetched data
  const lastMessage = messages.slice(-1);

  return (
    <div className="news-block">
      {lastMessage.map((data) => (
        <Message key={data.id} content={data.message} />
      ))}
    </div>
  );
};

export default FetchNews;
