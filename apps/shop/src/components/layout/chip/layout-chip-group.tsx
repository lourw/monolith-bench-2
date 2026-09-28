import { LayoutChip } from './layout-chip';
import type { LayoutChipGroupProps, LayoutChipItem } from './layout-chip.types';
import { toneFromValue } from './layout-chip-variants';

export function LayoutChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-chip-group',
  onSelect,
}: LayoutChipGroupProps) {
  const handleSelect = (item: LayoutChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutChip
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

export default LayoutChipGroup;
