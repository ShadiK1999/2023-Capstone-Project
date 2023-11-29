import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { AuthContext, useIsAuthenticated, useGetDecodedJwt } from '.';
import { ReactNode } from 'react';

vi.mock('jwt-decode', () => ({
  default: vi.fn().mockReturnValue({
    email: 'johndoe@gmail.com',
    // Id
    sub: '123456789',
    // Timestamp to expire
    exp: 1000000000,
    name: 'john',
  }),
}));

describe('useIsAuthenticated', () => {
  it('throws if used outside of context', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);
    try {
      renderHook(() => useIsAuthenticated());
    } catch (e) {
      expect(e).toEqual(Error('useIsAuthenticated must be used within a Auth Provider'));
    }
  });

  it('returns false if not logged in', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={{ jwt: null }}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useIsAuthenticated(), { wrapper });

    expect(result.current).toBe(false);
  });

  it('returns true if logged in', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={{ jwt: 'something' }}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useIsAuthenticated(), { wrapper });

    expect(result.current).toBe(true);
  });
});

describe('useDecodedJwt', () => {
  it('throws if used outside of context', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);
    try {
      renderHook(() => useGetDecodedJwt());
    } catch (e) {
      expect(e).toEqual(
        Error('useDecodedJwt must be used within a Auth Provider and user must be logged in'),
      );
    }
  });

  it('throws if not logged in', () => {
    vi.spyOn(console, 'error').mockImplementation(() => void 0);
    try {
      const wrapper = ({ children }: { children: ReactNode }) => (
        <AuthContext.Provider value={{ jwt: null }}>{children}</AuthContext.Provider>
      );

      renderHook(() => useGetDecodedJwt(), { wrapper });
    } catch (e) {
      expect(e).toEqual(
        Error('useDecodedJwt must be used within a Auth Provider and user must be logged in'),
      );
    }
  });

  it('returns true if logged in', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <AuthContext.Provider value={{ jwt: 'something' }}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useGetDecodedJwt(), { wrapper });

    expect(result.current).toEqual({
      email: 'johndoe@gmail.com',
      // Id
      sub: '123456789',
      // Timestamp to expire
      exp: 1000000000,
      name: 'john',
    });
  });
});
