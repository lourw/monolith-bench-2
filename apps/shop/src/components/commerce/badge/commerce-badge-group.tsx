import { CommerceBadge } from './commerce-badge';
import type {
  CommerceBadgeGroupProps,
  CommerceBadgeItem,
} from './commerce-badge.types';
import { toneFromValue } from './commerce-badge-variants';

export function CommerceBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-badge-group',
  onSelect,
}: CommerceBadgeGroupProps) {
  const handleSelect = (item: CommerceBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceBadge
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

export default CommerceBadgeGroup;
