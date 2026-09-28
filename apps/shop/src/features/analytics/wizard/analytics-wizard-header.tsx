import { InputsStat } from '../../../components/inputs/stat/inputs-stat';
import { ANALYTICS_WIZARD_FEATURE } from './analytics-wizard.routes';

export interface AnalyticsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_WIZARD_FEATURE.domain} · {ANALYTICS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsStat label="Items" value={count} tone="info" />
        <InputsStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
