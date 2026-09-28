import { LayoutList } from '../../../components/layout/list/layout-list';
import { BUNDLES_SUMMARY_FEATURE } from './bundles-summary.routes';

export interface BundlesSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_SUMMARY_FEATURE.domain} · {BUNDLES_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutList label="Items" value={count} tone="info" />
        <LayoutList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
