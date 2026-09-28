import { OverlayChip } from './overlay-chip';
import type {
  OverlayChipGroupProps,
  OverlayChipItem,
} from './overlay-chip.types';
import { toneFromValue } from './overlay-chip-variants';

export function OverlayChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-chip-group',
  onSelect,
}: OverlayChipGroupProps) {
  const handleSelect = (item: OverlayChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayChip
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

export default OverlayChipGroup;
