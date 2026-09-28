import { mathPercent } from '../../../utils/math/math-percent';
import { collectionText } from '../../../utils/collection/collection-text';
import { FeedbackHeader } from '../../feedback/header/feedback-header';
import type { TypographyHeaderProps } from './typography-header.types';
import { resolveTypographyHeaderStyle } from './typography-header-variants';

export function TypographyHeader({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-header',
  onSelect,
  children,
}: TypographyHeaderProps) {
  const formatted = value === undefined ? '' : mathPercent(value);
  const style = resolveTypographyHeaderStyle(tone, size);
  const ariaLabel = collectionText(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-header ui-element"
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
      <FeedbackHeader
        label="Feedback Header"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default TypographyHeader;
