import { MediaStat } from '../../../components/media/stat/media-stat';
import { BUNDLES_OVERVIEW_FEATURE } from './bundles-overview.routes';

export interface BundlesOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_OVERVIEW_FEATURE.domain} · {BUNDLES_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaStat label="Items" value={count} tone="info" />
        <MediaStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
