import { CoreTile } from '../../../components/core/tile/core-tile';
import { SIZING_WIZARD_FEATURE } from './sizing-wizard.routes';

export interface SizingWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_WIZARD_FEATURE.domain} · {SIZING_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreTile label="Items" value={count} tone="info" />
        <CoreTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
