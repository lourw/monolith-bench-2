import { MediaStat } from './media-stat';
import type { MediaStatGroupProps, MediaStatItem } from './media-stat.types';
import { toneFromValue } from './media-stat-variants';

export function MediaStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-stat-group',
  onSelect,
}: MediaStatGroupProps) {
  const handleSelect = (item: MediaStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaStat
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

export default MediaStatGroup;
