import { asyncName } from '../../../utils/async/async-name';
import { asyncCode } from '../../../utils/async/async-code';
import { mathCode } from '../../../utils/math/math-code';
import { FormsToolbar } from '../../forms/toolbar/forms-toolbar';
import type { CommerceTileProps } from './commerce-tile.types';
import { resolveCommerceTileStyle } from './commerce-tile-variants';

export function CommerceTile({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-commerce-tile',
  onSelect,
  children,
}: CommerceTileProps) {
  const formatted = value === undefined ? '' : asyncName(value);
  const style = resolveCommerceTileStyle(tone, size);
  const ariaLabel = mathCode(asyncCode(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-commerce-tile ui-element"
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
      <FormsToolbar label="Forms Toolbar" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CommerceTile;
