import { CommerceChip } from './commerce-chip';
import type {
  CommerceChipGroupProps,
  CommerceChipItem,
} from './commerce-chip.types';
import { toneFromValue } from './commerce-chip-variants';

export function CommerceChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-chip-group',
  onSelect,
}: CommerceChipGroupProps) {
  const handleSelect = (item: CommerceChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceChip
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

export default CommerceChipGroup;
