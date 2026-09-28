import { LayoutTile } from '../../../components/layout/tile/layout-tile';
import { SUPPORT_OVERVIEW_FEATURE } from './support-overview.routes';

export interface SupportOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_OVERVIEW_FEATURE.domain} · {SUPPORT_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutTile label="Items" value={count} tone="info" />
        <LayoutTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
