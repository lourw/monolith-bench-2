import { InputsBanner } from '../../../components/inputs/banner/inputs-banner';
import { BUNDLES_HISTORY_FEATURE } from './bundles-history.routes';

export interface BundlesHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_HISTORY_FEATURE.domain} · {BUNDLES_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsBanner label="Items" value={count} tone="info" />
        <InputsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
