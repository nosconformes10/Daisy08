import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

export default function Chat({ profile }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const user = auth.currentUser;

  // Pega as mensagens em tempo real
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: message,
      sender: profile.name,
      uid: user.uid,
      timestamp: serverTimestamp(),
      photo: profile.photo,
    });
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="flex items-center gap-2 bg-gray-950 p-4 shadow">
        <img src={profile.photo} alt="avatar" className="w-10 h-10 rounded-full" />
        <h2 className="text-yellow-400 font-semibold">Daisy 08 - {profile.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-2 rounded-lg ${
              msg.uid === user.uid ? 'bg-yellow-500 self-end ml-auto' : 'bg-gray-700'
            }`}
          >
            <div className="text-sm">{msg.text}</div>
            <div className="text-xs text-right text-gray-300">{msg.sender}</div>
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2 bg-gray-950">
        <input
          className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
