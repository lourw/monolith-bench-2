import { FormsBanner } from '../../../components/forms/banner/forms-banner';
import { PAYMENTS_EDITOR_FEATURE } from './payments-editor.routes';

export interface PaymentsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_EDITOR_FEATURE.domain} · {PAYMENTS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBanner label="Items" value={count} tone="info" />
        <FormsBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
