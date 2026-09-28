import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyWizardPage } from './loyalty-wizard-page';
import { LoyaltyWizardSummary } from './loyalty-wizard-summary';
import {
  LOYALTY_WIZARD_FEATURE,
  LOYALTY_WIZARD_ROUTE,
} from './loyalty-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_WIZARD_ROUTE]}>
      <LoyaltyWizardPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyWizardSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyWizardSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
