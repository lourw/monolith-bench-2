import { DataPanelGroup } from '../../../components/data/panel/data-panel-group';
import { buildPromotionsHistoryItems } from './promotions-history.model';
import { PROMOTIONS_HISTORY_FEATURE } from './promotions-history.routes';
import {
  pickPromotionsHistoryHighlights,
  totalPromotionsHistory,
} from './promotions-history.utils';

export interface PromotionsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsHistorySummary({
  compact = false,
  limit = 3,
}: PromotionsHistorySummaryProps) {
  const items = buildPromotionsHistoryItems();
  const totals = totalPromotionsHistory(items);
  const highlights = pickPromotionsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_HISTORY_FEATURE.title}
      </h3>
      <DataPanelGroup
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
