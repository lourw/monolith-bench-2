import { TypographyToolbar } from '../../../components/typography/toolbar/typography-toolbar';
import { ORDERS_OVERVIEW_FEATURE } from './orders-overview.routes';

export interface OrdersOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_OVERVIEW_FEATURE.domain} · {ORDERS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyToolbar label="Items" value={count} tone="info" />
        <TypographyToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
