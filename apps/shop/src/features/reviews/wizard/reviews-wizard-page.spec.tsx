import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReviewsWizardPage } from './reviews-wizard-page';
import { ReviewsWizardSummary } from './reviews-wizard-summary';
import {
  REVIEWS_WIZARD_FEATURE,
  REVIEWS_WIZARD_ROUTE,
} from './reviews-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[REVIEWS_WIZARD_ROUTE]}>
      <ReviewsWizardPage />
    </MemoryRouter>,
  );
}

describe('ReviewsWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(REVIEWS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      REVIEWS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(REVIEWS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReviewsWizardSummary', () => {
  it('renders the summary block', () => {
    render(<ReviewsWizardSummary />);
    expect(
      screen.getByTestId(`${REVIEWS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
