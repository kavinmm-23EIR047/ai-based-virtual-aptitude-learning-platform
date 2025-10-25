import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopics } from "../api/topics";
import ChatbotCard from "../components/ChatbotCard";

export default function TopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      const res = await getTopics();
      setTopic(res.data.find((t) => t._id === id));
    };
    fetchTopic();
  }, [id]);

  if (!topic) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
      <p className="mb-6">{topic.description}</p>
      <ChatbotCard onStart={() => alert("Chatbot starting...")} />
    </div>
  );
}
