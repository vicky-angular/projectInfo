import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useIsExpectedRoute } from './useIsExpectedRoute';

describe('useIsExpectedRoute', () => {
  const renderUseIsExpectedRouteHook = (initialRoute: string, expectedRouteName: string) => {
    return renderHook(() => useIsExpectedRoute(expectedRouteName), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="*" element={children} />
          </Routes>
        </MemoryRouter>
      ),
    });
  };

  it('returns true if the current route includes the expected route name', () => {
    const { result } = renderUseIsExpectedRouteHook('/dashboard', 'dashboard');
    expect(result.current).toBe(true);
  });

  it('returns false if the current route does not include the expected route name', () => {
    const { result } = renderUseIsExpectedRouteHook('/profile', 'dashboard');
    expect(result.current).toBe(false);
  });

  it('returns true if the current route partially matches the expected route name', () => {
    const { result } = renderUseIsExpectedRouteHook('/dashboard/settings', 'dashboard');
    expect(result.current).toBe(true);
  });

  it('is case-sensitive by default', () => {
    const { result } = renderUseIsExpectedRouteHook('/Dashboard', 'dashboard');
    expect(result.current).toBe(false);
  });
});
