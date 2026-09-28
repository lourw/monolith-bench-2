import { FeedbackBanner } from './feedback-banner';
import type {
  FeedbackBannerGroupProps,
  FeedbackBannerItem,
} from './feedback-banner.types';
import { toneFromValue } from './feedback-banner-variants';

export function FeedbackBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-feedback-banner-group',
  onSelect,
}: FeedbackBannerGroupProps) {
  const handleSelect = (item: FeedbackBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FeedbackBanner
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

export default FeedbackBannerGroup;
