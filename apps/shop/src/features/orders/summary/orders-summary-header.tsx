import { ChartsStat } from '../../../components/charts/stat/charts-stat';
import { ORDERS_SUMMARY_FEATURE } from './orders-summary.routes';

export interface OrdersSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_SUMMARY_FEATURE.domain} · {ORDERS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsStat label="Items" value={count} tone="info" />
        <ChartsStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
