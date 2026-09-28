import { LayoutBadge } from '../../../components/layout/badge/layout-badge';
import { ACCOUNT_INSIGHTS_FEATURE } from './account-insights.routes';

export interface AccountInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_INSIGHTS_FEATURE.domain} · {ACCOUNT_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutBadge label="Items" value={count} tone="info" />
        <LayoutBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
