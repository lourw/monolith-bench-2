import { DataToolbar } from './data-toolbar';
import type {
  DataToolbarGroupProps,
  DataToolbarItem,
} from './data-toolbar.types';
import { toneFromValue } from './data-toolbar-variants';

export function DataToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-toolbar-group',
  onSelect,
}: DataToolbarGroupProps) {
  const handleSelect = (item: DataToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataToolbar
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={`${testId}-${item.id}`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="ui-group-empty">Nothing to show</p>
      ) : null}
    </section>
  );
}

export default DataToolbarGroup;
