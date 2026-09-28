import { ChartsBadge } from '../../../components/charts/badge/charts-badge';
import { PAYMENTS_LIST_FEATURE } from './payments-list.routes';

export interface PaymentsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_LIST_FEATURE.domain} · {PAYMENTS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsBadge label="Items" value={count} tone="info" />
        <ChartsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
