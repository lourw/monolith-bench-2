import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import { STORE_LOCATOR_WIZARD_FEATURE } from './store-locator-wizard.routes';

export interface StoreLocatorWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{STORE_LOCATOR_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_WIZARD_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBanner label="Items" value={count} tone="info" />
        <FormsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
