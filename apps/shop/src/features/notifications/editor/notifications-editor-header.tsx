import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import { NOTIFICATIONS_EDITOR_FEATURE } from './notifications-editor.routes';

export interface NotificationsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{NOTIFICATIONS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_EDITOR_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_EDITOR_FEATURE.kind}
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
          data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
