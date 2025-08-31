import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { ProductListPage } from './pages/ProductListPage';
import { SpinnerTestPage } from './pages/SpinnerTestPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { PageLoader } from './components/common/PageLoader';
import { usePageLoading } from './hooks/usePageLoading';

function AppContent() {
  const isPageLoading = usePageLoading();

  return (
    <>
      {isPageLoading && <PageLoader />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/spinner-test" element={<SpinnerTestPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/products" element={<ProductListPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;