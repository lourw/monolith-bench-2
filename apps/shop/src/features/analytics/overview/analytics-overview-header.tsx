import { CommerceList } from '../../../components/commerce/list/commerce-list';
import { ANALYTICS_OVERVIEW_FEATURE } from './analytics-overview.routes';

export interface AnalyticsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_OVERVIEW_FEATURE.domain} ·{' '}
          {ANALYTICS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceList label="Items" value={count} tone="info" />
        <CommerceList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
