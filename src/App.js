import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsArea from './components/ResultsArea';
import Subscription from './components/Subscription';

function App() {
  const sampleResponses = [
    { type: 'text', content: 'Voici une réponse sous forme de texte.' },
    { type: 'math', content: 'c = \\pm\\sqrt{a^2 + b^2}' }
  ];
  const [isSubscriptionPopupOpen, setIsSubscriptionPopupOpen] = useState(false);

  const toggleSubscriptionPopup = () => {
    setIsSubscriptionPopupOpen(!isSubscriptionPopupOpen);
  };
  return (
    <div className="App">
      <h1>Resolver AI</h1>
      <Subscription
        isPopupOpen={isSubscriptionPopupOpen}
        togglePopup={toggleSubscriptionPopup}
      />
      <ResultsArea responses={sampleResponses} />
        <FileUpload />
      
    </div>
  );
}

export default App;
