import { TypographyChip } from './typography-chip';
import type {
  TypographyChipGroupProps,
  TypographyChipItem,
} from './typography-chip.types';
import { toneFromValue } from './typography-chip-variants';

export function TypographyChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-chip-group',
  onSelect,
}: TypographyChipGroupProps) {
  const handleSelect = (item: TypographyChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyChip
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

export default TypographyChipGroup;
