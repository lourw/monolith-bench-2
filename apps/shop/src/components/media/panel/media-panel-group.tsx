import { MediaPanel } from './media-panel';
import type { MediaPanelGroupProps, MediaPanelItem } from './media-panel.types';
import { toneFromValue } from './media-panel-variants';

export function MediaPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-panel-group',
  onSelect,
}: MediaPanelGroupProps) {
  const handleSelect = (item: MediaPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaPanel
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

export default MediaPanelGroup;
