import { useState } from 'react';
import LoginPhone from './LoginPhone';
import VerifyCode from './VerifyCode';
import Chat from './Chat';

export default function App() {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verified, setVerified] = useState(false);

  return (
    <div>
      {!verified && !confirmationResult && <LoginPhone setConfirmationResult={setConfirmationResult} />}
      {!verified && confirmationResult && <VerifyCode confirmationResult={confirmationResult} setVerified={setVerified} />}
      {verified && <Chat />}
    </div>
  );
}
