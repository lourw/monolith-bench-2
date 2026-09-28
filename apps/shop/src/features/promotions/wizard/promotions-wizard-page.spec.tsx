import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PromotionsWizardPage } from './promotions-wizard-page';
import { PromotionsWizardSummary } from './promotions-wizard-summary';
import {
  PROMOTIONS_WIZARD_FEATURE,
  PROMOTIONS_WIZARD_ROUTE,
} from './promotions-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROMOTIONS_WIZARD_ROUTE]}>
      <PromotionsWizardPage />
    </MemoryRouter>,
  );
}

describe('PromotionsWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROMOTIONS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROMOTIONS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(PROMOTIONS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${PROMOTIONS_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PromotionsWizardSummary', () => {
  it('renders the summary block', () => {
    render(<PromotionsWizardSummary />);
    expect(
      screen.getByTestId(`${PROMOTIONS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
