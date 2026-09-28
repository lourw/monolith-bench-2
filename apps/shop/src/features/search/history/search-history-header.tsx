import { DataBanner } from '../../../components/data/banner/data-banner';
import { SEARCH_HISTORY_FEATURE } from './search-history.routes';

export interface SearchHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_HISTORY_FEATURE.domain} · {SEARCH_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataBanner label="Items" value={count} tone="info" />
        <DataBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
