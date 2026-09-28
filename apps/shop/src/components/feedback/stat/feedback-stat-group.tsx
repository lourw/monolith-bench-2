import { FeedbackStat } from './feedback-stat';
import type {
  FeedbackStatGroupProps,
  FeedbackStatItem,
} from './feedback-stat.types';
import { toneFromValue } from './feedback-stat-variants';

export function FeedbackStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-stat-group',
  onSelect,
}: FeedbackStatGroupProps) {
  const handleSelect = (item: FeedbackStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackStat
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

export default FeedbackStatGroup;
