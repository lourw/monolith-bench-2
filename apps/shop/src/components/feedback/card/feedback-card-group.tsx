import { FeedbackCard } from './feedback-card';
import type {
  FeedbackCardGroupProps,
  FeedbackCardItem,
} from './feedback-card.types';
import { toneFromValue } from './feedback-card-variants';

export function FeedbackCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-card-group',
  onSelect,
}: FeedbackCardGroupProps) {
  const handleSelect = (item: FeedbackCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackCard
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

export default FeedbackCardGroup;
