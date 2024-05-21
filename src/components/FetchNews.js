import React, { useEffect, useState, useMemo } from 'react';
import DOMPurify from 'dompurify';

// Function to parse and process the message content
const processMessage = (message) => {
  // Replace <i=3> with <span class="news-header"> and </i> with </span>
  let processedContent = message.replace(/<i=3>/g, '<h1 class="news-header">');
  processedContent = processedContent.replace(/<\/i>/g, '</h1>');
  // Replace '\n' with <br> tags
  processedContent = processedContent.replace(/\n/g, '<br>');
  return processedContent;
};

// Component to render a single message
const Message = ({ content }) => {
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(processMessage(content));
  }, [content]);

  return (
    <div>
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
    // Fetch data from the API
    fetch('https://api.helldivers2.dev/raw/api/NewsFeed/801')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMessages(data); // Assuming data is an array of message objects
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
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
    <div>
      {lastMessage.map((data) => (
        <Message key={data.id} content={data.message} />
      ))}
    </div>
  );
};

export default FetchNews;
