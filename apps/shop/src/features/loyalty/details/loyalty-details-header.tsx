import { CommerceBadge } from '../../../components/commerce/badge/commerce-badge';
import { LOYALTY_DETAILS_FEATURE } from './loyalty-details.routes';

export interface LoyaltyDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_DETAILS_FEATURE.domain} · {LOYALTY_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceBadge label="Items" value={count} tone="info" />
        <CommerceBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
