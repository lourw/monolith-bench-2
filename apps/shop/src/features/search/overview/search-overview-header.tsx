import { DataPanel } from '../../../components/data/panel/data-panel';
import { SEARCH_OVERVIEW_FEATURE } from './search-overview.routes';

export interface SearchOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_OVERVIEW_FEATURE.domain} · {SEARCH_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataPanel label="Items" value={count} tone="info" />
        <DataPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
