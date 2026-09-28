import { InputsBanner } from './inputs-banner';
import type {
  InputsBannerGroupProps,
  InputsBannerItem,
} from './inputs-banner.types';
import { toneFromValue } from './inputs-banner-variants';

export function InputsBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-banner-group',
  onSelect,
}: InputsBannerGroupProps) {
  const handleSelect = (item: InputsBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsBanner
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

export default InputsBannerGroup;
