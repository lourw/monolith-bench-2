import { MarketingList } from '../../../components/marketing/list/marketing-list';
import { SEARCH_SUMMARY_FEATURE } from './search-summary.routes';

export interface SearchSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_SUMMARY_FEATURE.domain} · {SEARCH_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingList label="Items" value={count} tone="info" />
        <MarketingList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
