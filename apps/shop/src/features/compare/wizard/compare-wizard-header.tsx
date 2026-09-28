import { OverlayChip } from '../../../components/overlay/chip/overlay-chip';
import { COMPARE_WIZARD_FEATURE } from './compare-wizard.routes';

export interface CompareWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_WIZARD_FEATURE.domain} · {COMPARE_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayChip label="Items" value={count} tone="info" />
        <OverlayChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
