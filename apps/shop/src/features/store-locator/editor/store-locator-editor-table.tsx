import { TypographyStat } from '../../../components/typography/stat/typography-stat';
import type { StoreLocatorEditorItem } from './store-locator-editor.model';
import { STORE_LOCATOR_EDITOR_FEATURE } from './store-locator-editor.routes';
import {
  formatStoreLocatorEditorAmount,
  storeLocatorEditorStatusTone,
} from './store-locator-editor.utils';

export interface StoreLocatorEditorTableProps {
  items: ReadonlyArray<StoreLocatorEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function StoreLocatorEditorTable({
  items,
  selectedId,
  onSelect,
}: StoreLocatorEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-empty`}
      >
        No store locator editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatStoreLocatorEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <TypographyStat
                label={item.status}
                tone={storeLocatorEditorStatusTone(item.status)}
                size="sm"
                testId={`${STORE_LOCATOR_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
