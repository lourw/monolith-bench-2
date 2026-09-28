import { ChartsBannerGroup } from '../../../components/charts/banner/charts-banner-group';
import { buildAddressesEditorItems } from './addresses-editor.model';
import { ADDRESSES_EDITOR_FEATURE } from './addresses-editor.routes';
import {
  pickAddressesEditorHighlights,
  totalAddressesEditor,
} from './addresses-editor.utils';

export interface AddressesEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesEditorSummary({
  compact = false,
  limit = 3,
}: AddressesEditorSummaryProps) {
  const items = buildAddressesEditorItems();
  const totals = totalAddressesEditor(items);
  const highlights = pickAddressesEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_EDITOR_FEATURE.title}
      </h3>
      <ChartsBannerGroup
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
