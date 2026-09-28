import { OverlayToolbar } from '../../../components/overlay/toolbar/overlay-toolbar';
import { FEEDBACK_WIZARD_FEATURE } from './feedback-wizard.routes';

export interface FeedbackWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_WIZARD_FEATURE.domain} · {FEEDBACK_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayToolbar label="Items" value={count} tone="info" />
        <OverlayToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
