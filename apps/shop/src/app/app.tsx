import { lazy, Suspense } from 'react';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/shared/loading-spinner/loading-spinner';
import { featureRoutes } from './feature-routes';
import './app.css';

// Lazy load feature components
const ProductList = lazy(() =>
  import('../features/products/product-list/product-list').then((m) => ({
    default: m.ProductList,
  })),
);
const ProductDetail = lazy(() =>
  import('../features/product-detail/product-detail/product-detail').then(
    (m) => ({
      default: m.ProductDetail,
    }),
  ),
);
const FeatureIndex = lazy(() => import('./feature-index'));

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Nx Shop Demo</h1>
          <nav className="app-nav" aria-label="Primary">
            <Link to="/products">Products</Link>
            <Link to="/features">Features</Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/features" element={<FeatureIndex />} />
            {featureRoutes}
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
