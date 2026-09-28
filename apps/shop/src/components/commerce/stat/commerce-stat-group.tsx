import { CommerceStat } from './commerce-stat';
import type {
  CommerceStatGroupProps,
  CommerceStatItem,
} from './commerce-stat.types';
import { toneFromValue } from './commerce-stat-variants';

export function CommerceStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-stat-group',
  onSelect,
}: CommerceStatGroupProps) {
  const handleSelect = (item: CommerceStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceStat
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

export default CommerceStatGroup;
