// import { StrictMode } from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { QueryClient, QueryClientProvider } from 'react-query';

// //query client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 0
//     },
//   },
// });

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <QueryClientProvider client={queryClient}>      
//       <App />
//     </QueryClientProvider>
//     <App />
//   </StrictMode>
// )
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContextProvider } from './contexts/AppContext.tsx';

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* adding appContext */}
      <AppContextProvider>
        <App />
        </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);

