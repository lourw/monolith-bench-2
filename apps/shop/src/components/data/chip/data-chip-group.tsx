import { DataChip } from './data-chip';
import type { DataChipGroupProps, DataChipItem } from './data-chip.types';
import { toneFromValue } from './data-chip-variants';

export function DataChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-chip-group',
  onSelect,
}: DataChipGroupProps) {
  const handleSelect = (item: DataChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataChip
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

export default DataChipGroup;
