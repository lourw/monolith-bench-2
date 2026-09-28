import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import { PAYMENTS_DETAILS_FEATURE } from './payments-details.routes';

export interface PaymentsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_DETAILS_FEATURE.domain} · {PAYMENTS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutTile label="Items" value={count} tone="info" />
        <LayoutTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
