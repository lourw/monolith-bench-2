import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import { LOYALTY_HISTORY_FEATURE } from './loyalty-history.routes';

export interface LoyaltyHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_HISTORY_FEATURE.domain} · {LOYALTY_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsChip label="Items" value={count} tone="info" />
        <ChartsChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
