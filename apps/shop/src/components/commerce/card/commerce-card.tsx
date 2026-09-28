import { storageSlug } from '../../../utils/storage/storage-slug';
import { storageAddress } from '../../../utils/storage/storage-address';
import { FeedbackToolbar } from '../../feedback/toolbar/feedback-toolbar';
import type { CommerceCardProps } from './commerce-card.types';
import { resolveCommerceCardStyle } from './commerce-card-variants';

export function CommerceCard({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-card',
  onSelect,
  children,
}: CommerceCardProps) {
  const formatted = value === undefined ? '' : storageSlug(value);
  const style = resolveCommerceCardStyle(tone, size);
  const ariaLabel = storageAddress(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-card ui-element"
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
      <FeedbackToolbar
        label="Feedback Toolbar"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default CommerceCard;
