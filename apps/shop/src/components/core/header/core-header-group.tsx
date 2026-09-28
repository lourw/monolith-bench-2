import { CoreHeader } from './core-header';
import type { CoreHeaderGroupProps, CoreHeaderItem } from './core-header.types';
import { toneFromValue } from './core-header-variants';

export function CoreHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-header-group',
  onSelect,
}: CoreHeaderGroupProps) {
  const handleSelect = (item: CoreHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CoreHeader
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

export default CoreHeaderGroup;
