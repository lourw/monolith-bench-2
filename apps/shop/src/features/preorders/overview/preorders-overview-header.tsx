import { DataTile } from '../../../components/data/tile/data-tile';
import { PREORDERS_OVERVIEW_FEATURE } from './preorders-overview.routes';

export interface PreordersOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_OVERVIEW_FEATURE.domain} ·{' '}
          {PREORDERS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataTile label="Items" value={count} tone="info" />
        <DataTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
