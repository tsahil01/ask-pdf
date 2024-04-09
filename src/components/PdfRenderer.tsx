import { useState, useRef, useEffect } from 'react';
import { runChat } from '@/app/lib/chat';

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
            // Call runChat function with the user's message
            const responseMessage = await runChat(message);
    
            // Update state with the response message
            setMessages(prevMessages => [
                ...prevMessages.filter(msg => msg.sender !== 'typing'), // Remove previous "Typing..." message
                { text: responseMessage, sender: 'receiver' }
            ]);
        } catch (error) {
            console.error('There was an error sending/receiving messages:', error);
        } finally {
            setUserTyping(false); // Set userTyping to false after receiving response or encountering error
        }
    };

    return (
        <div className="grid md:grid-cols-2 w-screen">
            <div className="bg-gray-100 p-4 ">
                <div className="mt-4 rounded-xl">
                    <iframe
                        className="rounded-2xl"
                        src={url}
                        width="100%"
                        height={800}
                    />
                </div>
            </div>
            <div className="bg-gray-100 p-4 flex flex-col justify-between">
                <div className="mt-4 rounded-xl overflow-y-auto border p-3 flex-grow lg:max-h-[700px] max-h[400px]">
                    <div className="flex flex-col gap-2">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`rounded-xl px-4 py-2 mb-2 max-w-96 ${
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white self-end'
                                        : message.sender === 'typing'
                                            ? 'bg-gray-300 text-black self-start'
                                            : 'bg-black text-white self-start'
                                } max-w-1/2`}
                            >
                                {message.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring focus:border-zinc-900 border border-black"
                        disabled={userTyping}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
