import { NavigationPanel } from '../../../components/navigation/panel/navigation-panel';
import { CATALOG_WIZARD_FEATURE } from './catalog-wizard.routes';

export interface CatalogWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_WIZARD_FEATURE.domain} · {CATALOG_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationPanel label="Items" value={count} tone="info" />
        <NavigationPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
