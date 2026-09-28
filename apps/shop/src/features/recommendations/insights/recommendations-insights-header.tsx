import { NavigationStat } from '../../../components/navigation/stat/navigation-stat';
import { RECOMMENDATIONS_INSIGHTS_FEATURE } from './recommendations-insights.routes';

export interface RecommendationsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_INSIGHTS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_INSIGHTS_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationStat label="Items" value={count} tone="info" />
        <NavigationStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
