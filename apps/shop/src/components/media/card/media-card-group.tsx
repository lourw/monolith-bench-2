import { MediaCard } from './media-card';
import type { MediaCardGroupProps, MediaCardItem } from './media-card.types';
import { toneFromValue } from './media-card-variants';

export function MediaCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-card-group',
  onSelect,
}: MediaCardGroupProps) {
  const handleSelect = (item: MediaCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaCard
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

export default MediaCardGroup;
