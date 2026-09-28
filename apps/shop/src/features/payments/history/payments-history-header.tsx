import { NavigationTile } from '../../../components/navigation/tile/navigation-tile';
import { PAYMENTS_HISTORY_FEATURE } from './payments-history.routes';

export interface PaymentsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_HISTORY_FEATURE.domain} · {PAYMENTS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationTile label="Items" value={count} tone="info" />
        <NavigationTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
