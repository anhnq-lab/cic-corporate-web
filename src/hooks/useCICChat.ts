import { useState, useCallback } from 'react';
import { Message } from 'ai';

export function useCICChat(apiPath: string = '/api/chat') {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Xin chào! 👋 Tôi là **CIC AI** — trợ lý ảo của CIC.\n\nBạn có thể hỏi tôi về các giải pháp phần mềm, báo giá, hoặc thông tin doanh nghiệp. Tôi có thể giúp gì cho bạn hôm nay?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const activeMessages = [...messages.filter(m => m.id !== 'welcome'), userMessage];
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: activeMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      const aiMessageId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', content: '' }]);

      let done = false;
      let accumulatedText = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            accumulatedText += chunk;
            setMessages(prev => prev.map(msg =>
              msg.id === aiMessageId ? { ...msg, content: accumulatedText } : msg
            ));
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Chat AI Error:', err);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: '⚠️ Xin lỗi, hiện tại đang có gián đoạn đường truyền kết nối với máy chủ AI. Vui lòng thử lại sau.'
        }]);
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  }, [input, messages, isLoading, apiPath]);

  const stop = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      setIsLoading(false);
    }
  }, [abortController]);

  const reload = useCallback(() => {
    if (messages.length < 2) return;
    const lastUserMsgIndex = messages.map(m => m.role).lastIndexOf('user');
    if (lastUserMsgIndex !== -1) {
      const msgsBeforeLastUser = messages.slice(0, lastUserMsgIndex);
      const lastUserMsg = messages[lastUserMsgIndex];
      setMessages(msgsBeforeLastUser);
      setInput(lastUserMsg.content);
      // Wait for state to update, then submit? Tricky. Standard user will just press Enter.
      // Better:
      setTimeout(() => {
        handleSubmit(); // We'd need to properly handle input state.
      }, 0);
    }
  }, [messages, handleSubmit]);

  return { messages, input, setInput, handleSubmit, isLoading, stop, reload };
}
