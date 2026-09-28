import { OverlayToolbar } from '../../../components/overlay/toolbar/overlay-toolbar';
import { ADDRESSES_DETAILS_FEATURE } from './addresses-details.routes';

export interface AddressesDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_DETAILS_FEATURE.domain} · {ADDRESSES_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayToolbar label="Items" value={count} tone="info" />
        <OverlayToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
