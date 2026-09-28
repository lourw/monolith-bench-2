import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SearchWizardPage } from './search-wizard-page';
import { SearchWizardSummary } from './search-wizard-summary';
import {
  SEARCH_WIZARD_FEATURE,
  SEARCH_WIZARD_ROUTE,
} from './search-wizard.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SEARCH_WIZARD_ROUTE]}>
      <SearchWizardPage />
    </MemoryRouter>,
  );
}

describe('SearchWizardPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SEARCH_WIZARD_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SEARCH_WIZARD_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SEARCH_WIZARD_FEATURE.testId}-row`),
    ).toHaveLength(SEARCH_WIZARD_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${SEARCH_WIZARD_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SEARCH_WIZARD_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SEARCH_WIZARD_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SEARCH_WIZARD_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SEARCH_WIZARD_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SEARCH_WIZARD_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SearchWizardSummary', () => {
  it('renders the summary block', () => {
    render(<SearchWizardSummary />);
    expect(
      screen.getByTestId(`${SEARCH_WIZARD_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
