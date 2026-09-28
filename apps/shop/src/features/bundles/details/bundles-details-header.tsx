import { MarketingBadge } from '../../../components/marketing/badge/marketing-badge';
import { BUNDLES_DETAILS_FEATURE } from './bundles-details.routes';

export interface BundlesDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_DETAILS_FEATURE.domain} · {BUNDLES_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBadge label="Items" value={count} tone="info" />
        <MarketingBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
