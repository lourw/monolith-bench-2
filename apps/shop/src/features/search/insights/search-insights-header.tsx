import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import { SEARCH_INSIGHTS_FEATURE } from './search-insights.routes';

export interface SearchInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_INSIGHTS_FEATURE.domain} · {SEARCH_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingCard label="Items" value={count} tone="info" />
        <MarketingCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
