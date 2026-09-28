import { LayoutHeader } from '../../../components/layout/header/layout-header';
import { COMPARE_OVERVIEW_FEATURE } from './compare-overview.routes';

export interface CompareOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_OVERVIEW_FEATURE.domain} · {COMPARE_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutHeader label="Items" value={count} tone="info" />
        <LayoutHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
