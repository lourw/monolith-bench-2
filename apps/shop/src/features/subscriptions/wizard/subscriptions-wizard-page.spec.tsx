import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsWizardPage } from './subscriptions-wizard-page';
import { SubscriptionsWizardSummary } from './subscriptions-wizard-summary';
import {
  SUBSCRIPTIONS_WIZARD_FEATURE,
  SUBSCRIPTIONS_WIZARD_ROUTE,
} from './subscriptions-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_WIZARD_ROUTE]}>
      <SubscriptionsWizardPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsWizardSummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsWizardSummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
