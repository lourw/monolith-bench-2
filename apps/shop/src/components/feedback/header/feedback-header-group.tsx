import { FeedbackHeader } from './feedback-header';
import type {
  FeedbackHeaderGroupProps,
  FeedbackHeaderItem,
} from './feedback-header.types';
import { toneFromValue } from './feedback-header-variants';

export function FeedbackHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-header-group',
  onSelect,
}: FeedbackHeaderGroupProps) {
  const handleSelect = (item: FeedbackHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackHeader
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

export default FeedbackHeaderGroup;
