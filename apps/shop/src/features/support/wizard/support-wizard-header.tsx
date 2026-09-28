import { LayoutBadge } from '../../../components/layout/badge/layout-badge';
import { SUPPORT_WIZARD_FEATURE } from './support-wizard.routes';

export interface SupportWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_WIZARD_FEATURE.domain} · {SUPPORT_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutBadge label="Items" value={count} tone="info" />
        <LayoutBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
