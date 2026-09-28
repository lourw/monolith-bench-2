import { OverlayToolbar } from './overlay-toolbar';
import type {
  OverlayToolbarGroupProps,
  OverlayToolbarItem,
} from './overlay-toolbar.types';
import { toneFromValue } from './overlay-toolbar-variants';

export function OverlayToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-toolbar-group',
  onSelect,
}: OverlayToolbarGroupProps) {
  const handleSelect = (item: OverlayToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayToolbar
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

export default OverlayToolbarGroup;
