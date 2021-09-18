import React, { useEffect } from 'react';

// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes'

function App() {
  
  useEffect(async() => {
    const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // setaccountid(accounts1)
    if (window.ethereum) {
      async function getAccount() {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        // do something with new account here
        // alert('accont changed')
        window.location.reload()






      }

      window.ethereum.on('accountsChanged', function (accounts) {
        getAccount();
      })
    }
  }, [])
  return (
    <div>
      <MyRouts />
    </div>
  );
}

export default App;