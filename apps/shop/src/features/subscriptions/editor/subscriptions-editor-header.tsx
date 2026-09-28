import { TypographyHeader } from '../../../components/typography/header/typography-header';
import { SUBSCRIPTIONS_EDITOR_FEATURE } from './subscriptions-editor.routes';

export interface SubscriptionsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SubscriptionsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: SubscriptionsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUBSCRIPTIONS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUBSCRIPTIONS_EDITOR_FEATURE.domain} ·{' '}
          {SUBSCRIPTIONS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyHeader label="Items" value={count} tone="info" />
        <TypographyHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
