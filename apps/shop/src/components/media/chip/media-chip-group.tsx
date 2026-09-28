import { MediaChip } from './media-chip';
import type { MediaChipGroupProps, MediaChipItem } from './media-chip.types';
import { toneFromValue } from './media-chip-variants';

export function MediaChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-chip-group',
  onSelect,
}: MediaChipGroupProps) {
  const handleSelect = (item: MediaChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaChip
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

export default MediaChipGroup;
