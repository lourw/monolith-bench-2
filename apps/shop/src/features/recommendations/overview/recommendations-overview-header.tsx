import { CoreCard } from '../../../components/core/card/core-card';
import { RECOMMENDATIONS_OVERVIEW_FEATURE } from './recommendations-overview.routes';

export interface RecommendationsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_OVERVIEW_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_OVERVIEW_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreCard label="Items" value={count} tone="info" />
        <CoreCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
