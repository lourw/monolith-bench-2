import { DataHeader } from './data-header';
import type { DataHeaderGroupProps, DataHeaderItem } from './data-header.types';
import { toneFromValue } from './data-header-variants';

export function DataHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-header-group',
  onSelect,
}: DataHeaderGroupProps) {
  const handleSelect = (item: DataHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataHeader
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

export default DataHeaderGroup;
