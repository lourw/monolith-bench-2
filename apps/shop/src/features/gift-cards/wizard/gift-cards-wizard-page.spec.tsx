import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { GiftCardsWizardPage } from './gift-cards-wizard-page';
import { GiftCardsWizardSummary } from './gift-cards-wizard-summary';
import {
  GIFT_CARDS_WIZARD_FEATURE,
  GIFT_CARDS_WIZARD_ROUTE,
} from './gift-cards-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[GIFT_CARDS_WIZARD_ROUTE]}>
      <GiftCardsWizardPage />
    </MemoryRouter>,
  );
}

describe('GiftCardsWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(GIFT_CARDS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      GIFT_CARDS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(GIFT_CARDS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${GIFT_CARDS_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('GiftCardsWizardSummary', () => {
  it('renders the summary block', () => {
    render(<GiftCardsWizardSummary />);
    expect(
      screen.getByTestId(`${GIFT_CARDS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
