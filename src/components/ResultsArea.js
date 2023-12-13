import React from 'react';
import 'katex/dist/katex.min.css';
import '../styles/ResultsArea.css';
import { BlockMath } from 'react-katex'; // Assurez-vous que c'est la seule ligne qui importe BlockMath


const ResultsArea = ({ responses }) => {
  return (
    <div className="results-container">
      {responses.map((response, index) => (
        <div key={index} className="result-block">
          {response.type === 'text' ? (
            <div className="text-response">{response.content}</div>
          ) : (
            <BlockMath math={response.content} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsArea;
