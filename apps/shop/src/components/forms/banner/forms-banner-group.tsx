import { FormsBanner } from './forms-banner';
import type {
  FormsBannerGroupProps,
  FormsBannerItem,
} from './forms-banner.types';
import { toneFromValue } from './forms-banner-variants';

export function FormsBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-banner-group',
  onSelect,
}: FormsBannerGroupProps) {
  const handleSelect = (item: FormsBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsBanner
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

export default FormsBannerGroup;
