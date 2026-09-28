import { OverlayPanel } from './overlay-panel';
import type {
  OverlayPanelGroupProps,
  OverlayPanelItem,
} from './overlay-panel.types';
import { toneFromValue } from './overlay-panel-variants';

export function OverlayPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-panel-group',
  onSelect,
}: OverlayPanelGroupProps) {
  const handleSelect = (item: OverlayPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayPanel
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

export default OverlayPanelGroup;
