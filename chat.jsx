import { useState } from 'react';
import { auth, db, setDoc, doc } from './firebase';

export default function CreateProfile({ onProfileCreated }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleContinue = async () => {
    if (!name || !photo) return alert('Preencha todos os campos');

    const user = auth.currentUser;
    if (!user) return alert('Usuário não autenticado');

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name,
        photo
      });
      onProfileCreated({ name, photo });
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar perfil');
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl text-gray-100 mb-4">Crie seu Perfil</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Seu nome"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="mb-2 w-full"
        onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
      />
      {photo && <img src={photo} alt="preview" className="w-20 h-20 rounded-full mx-auto mb-2" />}
      <button onClick={handleContinue} className="bg-yellow-500 px-4 py-2 rounded text-white">
        Continuar
      </button>
    </div>
  );
}

