import { CoreList } from './core-list';
import type { CoreListGroupProps, CoreListItem } from './core-list.types';
import { toneFromValue } from './core-list-variants';

export function CoreListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-list-group',
  onSelect,
}: CoreListGroupProps) {
  const handleSelect = (item: CoreListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CoreList
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

export default CoreListGroup;
