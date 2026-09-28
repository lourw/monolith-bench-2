import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { RecommendationsWizardPage } from './recommendations-wizard-page';
import { RecommendationsWizardSummary } from './recommendations-wizard-summary';
import {
  RECOMMENDATIONS_WIZARD_FEATURE,
  RECOMMENDATIONS_WIZARD_ROUTE,
} from './recommendations-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RECOMMENDATIONS_WIZARD_ROUTE]}>
      <RecommendationsWizardPage />
    </MemoryRouter>,
  );
}

describe('RecommendationsWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(RECOMMENDATIONS_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RECOMMENDATIONS_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(RECOMMENDATIONS_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${RECOMMENDATIONS_WIZARD_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(
        `${RECOMMENDATIONS_WIZARD_FEATURE.testId}-panel-name`,
      ),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('RecommendationsWizardSummary', () => {
  it('renders the summary block', () => {
    render(<RecommendationsWizardSummary />);
    expect(
      screen.getByTestId(`${RECOMMENDATIONS_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
