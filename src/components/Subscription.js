import React, { useState, useEffect } from 'react';
import '../styles/Subscription.css';

const Subscription = ({ onTrialStart, onSubscribe }) => {
  const [trialUsed, setTrialUsed] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    // Ici, vous pourriez vouloir vérifier l'état d'essai du client lors du chargement du composant
    // Par exemple, vérifiez dans localStorage ou dans votre base de données si l'essai a déjà été utilisé
  }, []);

  const handleTrial = () => {
    setTrialUsed(true);
    onTrialStart(); // Supposons que cette fonction est passée via les props pour gérer le début de l'essai
  };

  const handlePaymentOptionClick = async (amount, subscription) => {
    // Remplacez ces informations par celles de l'utilisateur ou de la transaction
    const paymentDetails = {
      email: "customer@example.com",
      currency: "XAF",
      amount: amount,
      callback: "your_redirect_url_after_payment", // URL de redirection après paiement
      reference: "unique_transaction_reference" // Une référence unique pour cette transaction
      // ... autres informations nécessaires pour le paiement ...
    };
  
    try {
      // Remplacez 'PUBLIC_KEY' par votre clé publique Notch Pay
      const response = await fetch('https://api.notchpay.co/payments/initialize', {
        method: 'POST',
        headers: {
          'Authorization': 'PUBLIC_KEY',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentDetails)
      });
  
      const data = await response.json();
      if (data && data.status === "Accepted") {
        // Redirigez l'utilisateur vers l'URL de paiement
        window.location.href = data.authorization_url;
      } else {
        // Gérez les erreurs ou les réponses non acceptées
        console.error('Erreur lors de l\'initialisation du paiement:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  
    setShowPaymentPopup(false); // Fermez le popup de paiement
  };
  
  
  return (
    <div className="subscription-container">
      <button onClick={() => setShowPaymentPopup(true)}>S'abonner</button>
      {showPaymentPopup && (
        <div className="payment-popup">
          <div className="popup-inner">
            {/* Remplacez console.log par handlePaymentOptionClick avec le montant approprié */}
            <div className="payment-option card" onClick={() => handlePaymentOptionClick(100, false)}>
              <p>Payer 100 FR par utilisation</p>
            </div>
            <div className="payment-option card" onClick={() => handlePaymentOptionClick(10000, true)}>
              <p>Abonnement mensuel - 10 000 FR</p>
            </div>
            <button className="close-button" onClick={() => setShowPaymentPopup(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};  

export default Subscription;
