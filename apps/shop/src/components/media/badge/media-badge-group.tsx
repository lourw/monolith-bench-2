import { MediaBadge } from './media-badge';
import type { MediaBadgeGroupProps, MediaBadgeItem } from './media-badge.types';
import { toneFromValue } from './media-badge-variants';

export function MediaBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-badge-group',
  onSelect,
}: MediaBadgeGroupProps) {
  const handleSelect = (item: MediaBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaBadge
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

export default MediaBadgeGroup;
