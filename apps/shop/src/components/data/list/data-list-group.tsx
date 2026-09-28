import { DataList } from './data-list';
import type { DataListGroupProps, DataListItem } from './data-list.types';
import { toneFromValue } from './data-list-variants';

export function DataListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-list-group',
  onSelect,
}: DataListGroupProps) {
  const handleSelect = (item: DataListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataList
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

export default DataListGroup;
