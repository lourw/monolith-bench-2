import { ChartsToolbar } from '../../../components/charts/toolbar/charts-toolbar';
import { SEARCH_WIZARD_FEATURE } from './search-wizard.routes';

export interface SearchWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SearchWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SearchWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SEARCH_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SEARCH_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SEARCH_WIZARD_FEATURE.domain} · {SEARCH_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsToolbar label="Items" value={count} tone="info" />
        <ChartsToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SEARCH_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
