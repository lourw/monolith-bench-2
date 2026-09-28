import { MediaToolbar } from './media-toolbar';
import type {
  MediaToolbarGroupProps,
  MediaToolbarItem,
} from './media-toolbar.types';
import { toneFromValue } from './media-toolbar-variants';

export function MediaToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-toolbar-group',
  onSelect,
}: MediaToolbarGroupProps) {
  const handleSelect = (item: MediaToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaToolbar
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

export default MediaToolbarGroup;
