import { DataHeader } from '../../../components/data/header/data-header';
import { RETURNS_WIZARD_FEATURE } from './returns-wizard.routes';

export interface ReturnsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_WIZARD_FEATURE.domain} · {RETURNS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataHeader label="Items" value={count} tone="info" />
        <DataHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
