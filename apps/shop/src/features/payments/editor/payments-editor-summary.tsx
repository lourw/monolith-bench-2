import { FormsBannerGroup } from '../../../components/forms/banner/forms-banner-group';
import { buildPaymentsEditorItems } from './payments-editor.model';
import { PAYMENTS_EDITOR_FEATURE } from './payments-editor.routes';
import {
  pickPaymentsEditorHighlights,
  totalPaymentsEditor,
} from './payments-editor.utils';

export interface PaymentsEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsEditorSummary({
  compact = false,
  limit = 3,
}: PaymentsEditorSummaryProps) {
  const items = buildPaymentsEditorItems();
  const totals = totalPaymentsEditor(items);
  const highlights = pickPaymentsEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PAYMENTS_EDITOR_FEATURE.title}</h3>
      <FormsBannerGroup
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
