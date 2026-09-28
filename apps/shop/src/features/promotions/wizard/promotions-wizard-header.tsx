import { CoreStat } from '../../../components/core/stat/core-stat';
import { PROMOTIONS_WIZARD_FEATURE } from './promotions-wizard.routes';

export interface PromotionsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_WIZARD_FEATURE.domain} · {PROMOTIONS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreStat label="Items" value={count} tone="info" />
        <CoreStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
