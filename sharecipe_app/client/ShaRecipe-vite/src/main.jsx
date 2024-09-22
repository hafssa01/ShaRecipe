import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD:sharecipe_app/src/index.js
import App from './App.js';

=======
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
>>>>>>> testBranch:sharecipe_app/client/ShaRecipe-vite/src/main.jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="85792757464-4cer7qi0js1n067bhd9ca0ovcdcan1qg.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
<<<<<<< HEAD:sharecipe_app/src/index.js
);



=======
);
>>>>>>> testBranch:sharecipe_app/client/ShaRecipe-vite/src/main.jsx
