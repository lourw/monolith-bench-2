import { NavigationChip } from '../../../components/navigation/chip/navigation-chip';
import { ADDRESSES_HISTORY_FEATURE } from './addresses-history.routes';

export interface AddressesHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_HISTORY_FEATURE.domain} · {ADDRESSES_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationChip label="Items" value={count} tone="info" />
        <NavigationChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
