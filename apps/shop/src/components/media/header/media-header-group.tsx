import { MediaHeader } from './media-header';
import type {
  MediaHeaderGroupProps,
  MediaHeaderItem,
} from './media-header.types';
import { toneFromValue } from './media-header-variants';

export function MediaHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-header-group',
  onSelect,
}: MediaHeaderGroupProps) {
  const handleSelect = (item: MediaHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaHeader
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

export default MediaHeaderGroup;
