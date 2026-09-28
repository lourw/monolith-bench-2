import { FormsStat } from './forms-stat';
import type { FormsStatGroupProps, FormsStatItem } from './forms-stat.types';
import { toneFromValue } from './forms-stat-variants';

export function FormsStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-stat-group',
  onSelect,
}: FormsStatGroupProps) {
  const handleSelect = (item: FormsStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsStat
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

export default FormsStatGroup;
