import React, { useState, useRef } from 'react';
import '../styles/FileUpload.css'; // Assurez-vous que le chemin est correct

const FileUpload = ({ onFileSubmit }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false); // Nouvel état pour gérer le chargement

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      setLoading(true); // Démarre le chargement

      // Simuler un chargement (remplacez cela par votre logique de chargement)
      setTimeout(() => {
        setLoading(false); // Termine le chargement
      }, 1000);
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFileSubmit(file, text);
    // Réinitialiser les champs après la soumission
    setFile(null);
    setText('');
  };

  const openFileDialog = (e) => {
    e.preventDefault(); // Prévenir tout comportement par défaut
    fileInputRef.current.click();
  };

  return (
    <form className="file-upload-form" onSubmit={handleFormSubmit}>
      <label htmlFor="file-upload" className="custom-file-upload" onClick={openFileDialog}>
        📁
      </label>
      <input
        id="file-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="file-input"
      />
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        className="text-input"
        placeholder="Message ChatGPT..."
      />
      {loading && <div className="loading-indicator">Chargement...</div>}
      <button type="submit" className="submit-button">↑</button>
    </form>
  );
};

export default FileUpload;
