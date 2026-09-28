import { MarketingChip } from '../../../components/marketing/chip/marketing-chip';
import { COMPARE_DASHBOARD_FEATURE } from './compare-dashboard.routes';

export interface CompareDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_DASHBOARD_FEATURE.domain} · {COMPARE_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingChip label="Items" value={count} tone="info" />
        <MarketingChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
