import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/routes.tsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false
    }
  }
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </Router>
  </StrictMode>,
)
