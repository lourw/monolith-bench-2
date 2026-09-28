import { LayoutCard } from '../../../components/layout/card/layout-card';
import { LOYALTY_OVERVIEW_FEATURE } from './loyalty-overview.routes';

export interface LoyaltyOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_OVERVIEW_FEATURE.domain} · {LOYALTY_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutCard label="Items" value={count} tone="info" />
        <LayoutCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
