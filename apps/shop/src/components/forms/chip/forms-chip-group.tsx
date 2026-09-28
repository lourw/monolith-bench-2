import { FormsChip } from './forms-chip';
import type { FormsChipGroupProps, FormsChipItem } from './forms-chip.types';
import { toneFromValue } from './forms-chip-variants';

export function FormsChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-chip-group',
  onSelect,
}: FormsChipGroupProps) {
  const handleSelect = (item: FormsChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsChip
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

export default FormsChipGroup;
