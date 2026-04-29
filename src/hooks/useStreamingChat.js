import { useState, useCallback, useRef } from 'react';
import config from '../config/config';

const AI_URL = import.meta.env.VITE_AI_URL || config.baseURL;

/**
 * Hook for streaming AI responses via SSE.
 * Falls back to regular fetch if streaming fails.
 */
const useStreamingChat = () => {
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef(null);

  const streamChat = useCallback(async (message, history = [], onComplete) => {
    setIsStreaming(true);
    setStreamingText('');

    try {
      const response = await fetch(`${AI_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, stream: true }),
      });

      if (!response.ok) throw new Error('Stream request failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      abortRef.current = reader;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            fullText += data;
            setStreamingText(fullText);
          }
        }
      }

      setIsStreaming(false);
      if (onComplete) onComplete(fullText);
      return fullText;
    } catch (err) {
      setIsStreaming(false);
      // Fallback to non-streaming
      try {
        const response = await fetch(`${AI_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history, stream: false }),
        });
        const data = await response.json();
        const text = data.message || '';
        setStreamingText(text);
        if (onComplete) onComplete(text);
        return text;
      } catch (fallbackErr) {
        if (onComplete) onComplete('');
        return '';
      }
    }
  }, []);

  const cancelStream = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.cancel();
      abortRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  return { streamChat, streamingText, isStreaming, cancelStream };
};

export default useStreamingChat;
