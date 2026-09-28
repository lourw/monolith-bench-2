import { InputsToolbar } from '../../../components/inputs/toolbar/inputs-toolbar';
import { INVENTORY_WIZARD_FEATURE } from './inventory-wizard.routes';

export interface InventoryWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventoryWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventoryWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_WIZARD_FEATURE.domain} · {INVENTORY_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsToolbar label="Items" value={count} tone="info" />
        <InputsToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
