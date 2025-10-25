import { MessageCircle } from "lucide-react";

export default function ChatbotCard({ onStart }) {
  return (
    <div
      className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer text-center"
      onClick={onStart}
    >
      <MessageCircle className="mx-auto mb-2 text-indigo-600" size={48} />
      <h3 className="font-semibold text-gray-700">Start Chatbot</h3>
      <p className="text-gray-500 mt-1">Ask questions and get instant guidance</p>
    </div>
  );
}
