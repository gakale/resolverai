// components/History.js
import React, { useState, useEffect } from 'react';
import { db } from '../helpers/firebase';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore'; 
import '../styles/History.css';

const History = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "history"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const historyItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHistory(historyItems);
      });

      return () => unsubscribe();
    }
  }, [user]);

  // ... Le reste du composant ...
};

export default History;
