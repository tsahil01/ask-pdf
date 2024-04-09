import { useState, useRef, useEffect } from 'react';
import { runChat } from '@/app/lib/chat';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import { ChatBoxHeading } from './ChatBoxHeading';

interface Message {
    text: string;
    sender: string;
}

interface PdfRendererProps {
    url: string;
}

export function PdfRenderer({ url }: PdfRendererProps): JSX.Element {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userTyping, setUserTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (message: string): Promise<void> => {
        // Add user's message to the state
        setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
        setUserTyping(true);
        setMessages(prevMessages => [...prevMessages, { text: 'Typing...', sender: 'typing' }]);
    
        try {
            const responseMessage = await runChat(message);
    
            setMessages(prevMessages => [
                ...prevMessages.filter(msg => msg.sender !== 'typing'),
                { text: responseMessage, sender: 'receiver' }
            ]);
        } catch (error) {
            console.error('There was an error sending/receiving messages:', error);
        } finally {
            setUserTyping(false);
        }
    };

    return (
        <div className="grid md:grid-cols-2 w-full">
            <div className=" md:p-4 p-2">
                <div className="mt-4 rounded-xl">
                    <iframe
                        title='pdf-renderer'
                        className="rounded-2xl w-full  object-cover"
                        src={url}
                        height={800}
                    />
                </div>
            </div>
            <div className="p-4 flex flex-col justify-between">
                <div className="mt-4 rounded-xl overflow-y-auto border p-3 flex-grow lg:max-h-[700px]">
                    <div className="flex flex-col gap-1">
                        {messages.length === 0 && <ChatBoxHeading />}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`rounded-xl px-4 py-2 mb-2 max-w-[700px] overflow-auto ${
                                    message.sender === 'user'
                                        ? 'bg-zinc-700 text-white self-end'
                                        : message.sender === 'typing'
                                            ? 'bg-zinc-800 text-white self-start'
                                            : 'bg-zinc-800 text-white self-start'
                                } `}
                            >
                                {message.sender !== 'user'?
                                <ReactMarkdown>{message.text}</ReactMarkdown>
                                : message.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="w-3/4 px-4 py-2 rounded-xl focus:outline-none focus:ring focus:border-zinc-900 border border-black"
                        disabled={userTyping}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                handleSendMessage(e.currentTarget.value); 
                                e.currentTarget.value = '';
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
