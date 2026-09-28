import { storageCurrency } from '../../../utils/storage/storage-currency';
import { FeedbackList } from '../../feedback/list/feedback-list';
import type { MediaCardProps } from './media-card.types';
import { resolveMediaCardStyle } from './media-card-variants';

export function MediaCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-media-card',
  onSelect,
  children,
}: MediaCardProps) {
  const formatted = value === undefined ? '' : storageCurrency(value);
  const style = resolveMediaCardStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-media-card ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
      <FeedbackList label="Feedback List" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default MediaCard;
