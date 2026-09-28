import { LayoutPanel } from './layout-panel';
import type {
  LayoutPanelGroupProps,
  LayoutPanelItem,
} from './layout-panel.types';
import { toneFromValue } from './layout-panel-variants';

export function LayoutPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-panel-group',
  onSelect,
}: LayoutPanelGroupProps) {
  const handleSelect = (item: LayoutPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutPanel
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

export default LayoutPanelGroup;
