import { ChartsStat } from '../../../components/charts/stat/charts-stat';
import { BUNDLES_WIZARD_FEATURE } from './bundles-wizard.routes';

export interface BundlesWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_WIZARD_FEATURE.domain} · {BUNDLES_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsStat label="Items" value={count} tone="info" />
        <ChartsStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
