import { useState, useEffect } from 'react';
import { auth, db, getDoc, doc } from './firebase';
import LoginPhone from './LoginPhone';
import VerifyCode from './VerifyCode';
import CreateProfile from './CreateProfile';
import Chat from './Chat';

export default function App() {
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verified, setVerified] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileRef = doc(db, 'users', user.uid);
        const snap = await getDoc(profileRef);
        if (snap.exists()) {
          setProfile(snap.data());
        }
      }
    };
    if (verified && !profile) fetchProfile();
  }, [verified, profile]);

  return (
    <div>
      {!verified && !confirmationResult && (
        <LoginPhone setConfirmationResult={setConfirmationResult} />
      )}
      {!verified && confirmationResult && (
        <VerifyCode confirmationResult={confirmationResult} setVerified={setVerified} />
      )}
      {verified && !profile && (
        <CreateProfile onProfileCreated={setProfile} />
      )}
      {verified && profile && (
        <Chat profile={profile} />
      )}
    </div>
  );
}
}
