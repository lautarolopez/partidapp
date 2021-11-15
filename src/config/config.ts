const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.toString(),
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.toString(),
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.toString(),
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.toString(),
    messagingSenderId:
      import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.toString(),
    appId: import.meta.env.VITE_FIREBASE_APP_ID?.toString(),
  },
};

export default config;
