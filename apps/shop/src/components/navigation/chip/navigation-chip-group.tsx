import { NavigationChip } from './navigation-chip';
import type {
  NavigationChipGroupProps,
  NavigationChipItem,
} from './navigation-chip.types';
import { toneFromValue } from './navigation-chip-variants';

export function NavigationChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-chip-group',
  onSelect,
}: NavigationChipGroupProps) {
  const handleSelect = (item: NavigationChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationChip
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

export default NavigationChipGroup;
