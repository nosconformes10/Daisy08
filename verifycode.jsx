import { useState } from 'react';

export default function VerifyCode({ confirmationResult }) {
  const [code, setCode] = useState('');

  const verifyCode = async () => {
    try {
      await confirmationResult.confirm(code);
      alert('Verificação concluída!');
    } catch (err) {
      alert('Código incorreto');
    }
  };

  return (
    <div className="p-4 text-center">
      <input
        className="border p-2 w-full"
        placeholder="Código de 6 dígitos"
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={verifyCode} className="bg-gray-700 mt-2 px-4 py-2 rounded text-white">
        Verificar
      </button>
    </div>
  );
}
