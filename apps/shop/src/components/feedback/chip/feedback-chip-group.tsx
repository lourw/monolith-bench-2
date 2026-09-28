import { FeedbackChip } from './feedback-chip';
import type {
  FeedbackChipGroupProps,
  FeedbackChipItem,
} from './feedback-chip.types';
import { toneFromValue } from './feedback-chip-variants';

export function FeedbackChipGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-chip-group',
  onSelect,
}: FeedbackChipGroupProps) {
  const handleSelect = (item: FeedbackChipItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackChip
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

export default FeedbackChipGroup;
