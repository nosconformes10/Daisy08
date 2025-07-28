export default function Chat({ profile }) {
  return (
    <div className="p-4 text-white bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen">
      <h2 className="text-2xl font-bold text-yellow-400">Bem-vindo ao Daisy 08, {profile.name}</h2>
      <img src={profile.photo} alt="Avatar" className="w-16 h-16 rounded-full mt-2" />
      <p className="mt-4">Área de mensagens em construção...</p>
    </div>
  );
}
