import { CommerceHeader } from '../../../components/commerce/header/commerce-header';
import { ADDRESSES_SETTINGS_FEATURE } from './addresses-settings.routes';

export interface AddressesSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_SETTINGS_FEATURE.domain} ·{' '}
          {ADDRESSES_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceHeader label="Items" value={count} tone="info" />
        <CommerceHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
