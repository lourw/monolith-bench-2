import { ChartsPanel } from '../../../components/charts/panel/charts-panel';
import { PAYMENTS_WIZARD_FEATURE } from './payments-wizard.routes';

export interface PaymentsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_WIZARD_FEATURE.domain} · {PAYMENTS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsPanel label="Items" value={count} tone="info" />
        <ChartsPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
