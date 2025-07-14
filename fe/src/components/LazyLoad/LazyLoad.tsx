import React, { Suspense, lazy, ComponentType } from 'react';

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: Record<string, any>;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ 
  component, 
  fallback = <div>Loading...</div>,
  props = {}
}) => {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Predefined lazy components for common use cases
export const LazyHome = lazy(() => import('../../page/user/PageHome'));
export const LazyProductDetail = lazy(() => import('../../page/user/ProductDetailPage/ProductDetailPage2'));

// Admin lazy components
export const LazyAdminDashboard = lazy(() => import('../../page/admin/dashboard/Dashboard'));
export const LazyAdminProducts = lazy(() => import('../../page/admin/products'));
export const LazyAdminCategories = lazy(() => import('../../page/admin/category'));
export const LazyAdminUsers = lazy(() => import('../../page/admin/user'));

export default LazyLoad; 