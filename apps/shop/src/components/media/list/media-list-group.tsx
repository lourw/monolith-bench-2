import { MediaList } from './media-list';
import type { MediaListGroupProps, MediaListItem } from './media-list.types';
import { toneFromValue } from './media-list-variants';

export function MediaListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-list-group',
  onSelect,
}: MediaListGroupProps) {
  const handleSelect = (item: MediaListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaList
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

export default MediaListGroup;
