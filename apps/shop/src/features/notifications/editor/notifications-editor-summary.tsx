import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { buildNotificationsEditorItems } from './notifications-editor.model';
import { NOTIFICATIONS_EDITOR_FEATURE } from './notifications-editor.routes';
import {
  pickNotificationsEditorHighlights,
  totalNotificationsEditor,
} from './notifications-editor.utils';

export interface NotificationsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsEditorSummary({
  compact = false,
  limit = 3,
}: NotificationsEditorSummaryProps) {
  const items = buildNotificationsEditorItems();
  const totals = totalNotificationsEditor(items);
  const highlights = pickNotificationsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_EDITOR_FEATURE.title}
      </h3>
      <LayoutChipGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
