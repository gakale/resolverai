import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import ResultsArea from './components/ResultsArea';
import Subscription from './components/Subscription';
import History from './components/History';
import Popup from './components/Popup';
import { signInWithGoogle, auth } from './helpers/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isSubscriptionPopupOpen, setIsSubscriptionPopupOpen] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const toggleSubscriptionPopup = () => {
    setIsSubscriptionPopupOpen(!isSubscriptionPopupOpen);
  };

  const handleSelectHistory = (history) => {
    setSelectedHistory(history);
    // Vous pourriez vouloir mettre à jour ResultsArea ici
  };

  const handleDeleteHistory = (historyId) => {
    // Logique pour supprimer l'histoire de Firebase et de l'état local
    setShowDeletePopup(true);
    // Vous devrez confirmer la suppression dans le Popup avant de réellement supprimer
  };

  const confirmDelete = (confirmed) => {
    if (confirmed) {
      // Effectuez la suppression ici
    }
    setShowDeletePopup(false);
  };

  return (
    <div className="App">
      <h1>Resolver AI</h1>
      {user ? (
        <div>
          <button onClick={() => auth.signOut()}>Se déconnecter</button>
          <p>Bonjour, {user.displayName}</p>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Se connecter avec Google</button>
      )}
      <Subscription
        isPopupOpen={isSubscriptionPopupOpen}
        togglePopup={toggleSubscriptionPopup}
      />
      {selectedHistory && <ResultsArea responses={[selectedHistory]} />}
      <History items={historyItems} onSelectHistory={handleSelectHistory} onDeleteHistory={handleDeleteHistory} />
      <FileUpload />
      {showDeletePopup && (
        <Popup show={showDeletePopup} onClose={() => setShowDeletePopup(false)}>
          <p>Êtes-vous sûr de vouloir supprimer cet historique ?</p>
          <button onClick={() => confirmDelete(true)}>Oui</button>
          <button onClick={() => confirmDelete(false)}>Non</button>
        </Popup>
      )}
    </div>
  );
}

export default App;
