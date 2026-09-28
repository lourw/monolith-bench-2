import { ChartsHeader } from '../../../components/charts/header/charts-header';
import { LOYALTY_WIZARD_FEATURE } from './loyalty-wizard.routes';

export interface LoyaltyWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_WIZARD_FEATURE.domain} · {LOYALTY_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsHeader label="Items" value={count} tone="info" />
        <ChartsHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
