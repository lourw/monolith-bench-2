import { FeedbackList } from './feedback-list';
import type {
  FeedbackListGroupProps,
  FeedbackListItem,
} from './feedback-list.types';
import { toneFromValue } from './feedback-list-variants';

export function FeedbackListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-list-group',
  onSelect,
}: FeedbackListGroupProps) {
  const handleSelect = (item: FeedbackListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackList
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

export default FeedbackListGroup;
