import { FormsPanel } from '../../../components/forms/panel/forms-panel';
import { SEARCH_DETAILS_FEATURE } from './search-details.routes';

export interface SearchDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_DETAILS_FEATURE.domain} · {SEARCH_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsPanel label="Items" value={count} tone="info" />
        <FormsPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
