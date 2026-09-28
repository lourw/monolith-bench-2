import { DataHeader } from '../../../components/data/header/data-header';
import type { PromotionsSettingsItem } from './promotions-settings.model';
import { PROMOTIONS_SETTINGS_FEATURE } from './promotions-settings.routes';
import {
  formatPromotionsSettingsAmount,
  promotionsSettingsStatusTone,
} from './promotions-settings.utils';

export interface PromotionsSettingsTableProps {
  items: ReadonlyArray<PromotionsSettingsItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PromotionsSettingsTable({
  items,
  selectedId,
  onSelect,
}: PromotionsSettingsTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-empty`}
      >
        No promotions settings entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatPromotionsSettingsAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <DataHeader
                label={item.status}
                tone={promotionsSettingsStatusTone(item.status)}
                size="sm"
                testId={`${PROMOTIONS_SETTINGS_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
