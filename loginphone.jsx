import { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from './firebase';

export default function LoginPhone({ setConfirmationResult }) {
  const [phone, setPhone] = useState('');

  const handleSendCode = async () => {
    const formattedPhone = '+244' + phone.replace(/^0+/, '');
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', { size: 'invisible' }, auth);
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      alert('Código enviado!');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar código');
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl text-gray-800">Login Daisy 08</h2>
      <input
        className="border p-2 mt-4 w-full"
        placeholder="Digite seu número (ex: 935xxxxxx)"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendCode} className="bg-yellow-500 mt-2 px-4 py-2 rounded text-white">
        Enviar Código
      </button>
      <div id="recaptcha"></div>
    </div>
  );
}

