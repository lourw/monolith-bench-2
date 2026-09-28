import { LayoutToolbar } from './layout-toolbar';
import type {
  LayoutToolbarGroupProps,
  LayoutToolbarItem,
} from './layout-toolbar.types';
import { toneFromValue } from './layout-toolbar-variants';

export function LayoutToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-toolbar-group',
  onSelect,
}: LayoutToolbarGroupProps) {
  const handleSelect = (item: LayoutToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutToolbar
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

export default LayoutToolbarGroup;
