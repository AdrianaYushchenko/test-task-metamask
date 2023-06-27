import React, { useState } from 'react';
import './index.scss';

export const Index = () => {
  const [response, setResponse] = useState('');
  const message = 'Hello, Chainfuse!';

  const getAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      return accounts[0];
    } catch (err) {
      if (err.code === 4001) {
        setResponse('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    }
  };

  const onClickHandler = async () => {
    try {
      const account = await getAccount();
      const sign = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account]
      });

      setResponse(sign);
    } catch (e) {
      console.error('Error signing data with Metamask');
    }
  };

  return (
    <div className="container">
      <button className="metamask-button" onClick={onClickHandler}>
        Sing in text with Metamask
      </button>
      {response && (
        <div className="transaction-response">
          <strong>Transaction made by signing text with Metamask:</strong> ${response}
        </div>
      )}
    </div>
  );
};
