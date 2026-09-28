import { NavigationToolbar } from '../../../components/navigation/toolbar/navigation-toolbar';
import { ORDERS_DETAILS_FEATURE } from './orders-details.routes';

export interface OrdersDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_DETAILS_FEATURE.domain} · {ORDERS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationToolbar label="Items" value={count} tone="info" />
        <NavigationToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
