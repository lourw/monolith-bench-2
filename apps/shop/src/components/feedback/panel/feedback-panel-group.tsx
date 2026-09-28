import { FeedbackPanel } from './feedback-panel';
import type {
  FeedbackPanelGroupProps,
  FeedbackPanelItem,
} from './feedback-panel.types';
import { toneFromValue } from './feedback-panel-variants';

export function FeedbackPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-panel-group',
  onSelect,
}: FeedbackPanelGroupProps) {
  const handleSelect = (item: FeedbackPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackPanel
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

export default FeedbackPanelGroup;
