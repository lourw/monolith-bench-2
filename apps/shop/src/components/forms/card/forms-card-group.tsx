import { FormsCard } from './forms-card';
import type { FormsCardGroupProps, FormsCardItem } from './forms-card.types';
import { toneFromValue } from './forms-card-variants';

export function FormsCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-card-group',
  onSelect,
}: FormsCardGroupProps) {
  const handleSelect = (item: FormsCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsCard
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

export default FormsCardGroup;
