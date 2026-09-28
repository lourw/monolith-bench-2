import { ChartsChip } from './charts-chip';
import type { ChartsChipGroupProps, ChartsChipItem } from './charts-chip.types';
import { toneFromValue } from './charts-chip-variants';

export function ChartsChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-chip-group',
  onSelect,
}: ChartsChipGroupProps) {
  const handleSelect = (item: ChartsChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsChip
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

export default ChartsChipGroup;
