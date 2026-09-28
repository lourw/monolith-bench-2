import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import { ACCOUNT_WIZARD_FEATURE } from './account-wizard.routes';

export interface AccountWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_WIZARD_FEATURE.domain} · {ACCOUNT_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutChip label="Items" value={count} tone="info" />
        <LayoutChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
