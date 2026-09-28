import { MediaBanner } from '../../../components/media/banner/media-banner';
import { ADDRESSES_OVERVIEW_FEATURE } from './addresses-overview.routes';

export interface AddressesOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_OVERVIEW_FEATURE.domain} ·{' '}
          {ADDRESSES_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaBanner label="Items" value={count} tone="info" />
        <MediaBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
