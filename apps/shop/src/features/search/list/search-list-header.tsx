import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import { SEARCH_LIST_FEATURE } from './search-list.routes';

export interface SearchListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchListHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_LIST_FEATURE.domain} · {SEARCH_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBanner label="Items" value={count} tone="info" />
        <MarketingBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
