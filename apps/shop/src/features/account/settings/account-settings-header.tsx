import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import { ACCOUNT_SETTINGS_FEATURE } from './account-settings.routes';

export interface AccountSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_SETTINGS_FEATURE.domain} · {ACCOUNT_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackChip label="Items" value={count} tone="info" />
        <FeedbackChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
