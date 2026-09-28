import { CommerceCard } from './commerce-card';
import type {
  CommerceCardGroupProps,
  CommerceCardItem,
} from './commerce-card.types';
import { toneFromValue } from './commerce-card-variants';

export function CommerceCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-card-group',
  onSelect,
}: CommerceCardGroupProps) {
  const handleSelect = (item: CommerceCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceCard
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

export default CommerceCardGroup;
