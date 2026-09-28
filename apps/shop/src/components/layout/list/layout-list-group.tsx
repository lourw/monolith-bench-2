import { LayoutList } from './layout-list';
import type { LayoutListGroupProps, LayoutListItem } from './layout-list.types';
import { toneFromValue } from './layout-list-variants';

export function LayoutListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-list-group',
  onSelect,
}: LayoutListGroupProps) {
  const handleSelect = (item: LayoutListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutList
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

export default LayoutListGroup;
