import { DataCard } from '../../../components/data/card/data-card';
import { PREORDERS_DETAILS_FEATURE } from './preorders-details.routes';

export interface PreordersDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_DETAILS_FEATURE.domain} · {PREORDERS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataCard label="Items" value={count} tone="info" />
        <DataCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
