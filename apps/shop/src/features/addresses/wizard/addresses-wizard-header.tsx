import { NavigationTile } from '../../../components/navigation/tile/navigation-tile';
import { ADDRESSES_WIZARD_FEATURE } from './addresses-wizard.routes';

export interface AddressesWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_WIZARD_FEATURE.domain} · {ADDRESSES_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationTile label="Items" value={count} tone="info" />
        <NavigationTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
