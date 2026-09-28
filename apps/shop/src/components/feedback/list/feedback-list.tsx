import { formatPhone } from '../../../utils/format/format-phone';
import { LayoutPanel } from '../../layout/panel/layout-panel';
import type { FeedbackListProps } from './feedback-list.types';
import { resolveFeedbackListStyle } from './feedback-list-variants';

export function FeedbackList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-list',
  onSelect,
  children,
}: FeedbackListProps) {
  const formatted = value === undefined ? '' : formatPhone(value);
  const style = resolveFeedbackListStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-list ui-element"
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
      <LayoutPanel label="Layout Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackList;
