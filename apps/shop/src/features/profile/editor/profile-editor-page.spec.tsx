import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProfileEditorPage } from './profile-editor-page';
import { ProfileEditorSummary } from './profile-editor-summary';
import {
  PROFILE_EDITOR_FEATURE,
  PROFILE_EDITOR_ROUTE,
} from './profile-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PROFILE_EDITOR_ROUTE]}>
      <ProfileEditorPage />
    </MemoryRouter>,
  );
}

describe('ProfileEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PROFILE_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PROFILE_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PROFILE_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(PROFILE_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PROFILE_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PROFILE_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PROFILE_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PROFILE_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PROFILE_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PROFILE_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ProfileEditorSummary', () => {
  it('renders the summary block', () => {
    render(<ProfileEditorSummary />);
    expect(
      screen.getByTestId(`${PROFILE_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
