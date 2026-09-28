import { CoreCard } from '../../../components/core/card/core-card';
import { ADDRESSES_LIST_FEATURE } from './addresses-list.routes';

export interface AddressesListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesListHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_LIST_FEATURE.domain} · {ADDRESSES_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreCard label="Items" value={count} tone="info" />
        <CoreCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
