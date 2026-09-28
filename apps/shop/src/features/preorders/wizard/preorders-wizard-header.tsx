import { DataChip } from '../../../components/data/chip/data-chip';
import { PREORDERS_WIZARD_FEATURE } from './preorders-wizard.routes';

export interface PreordersWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_WIZARD_FEATURE.domain} · {PREORDERS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataChip label="Items" value={count} tone="info" />
        <DataChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
