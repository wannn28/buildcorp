const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

// ─── Token storage ────────────────────────────────────────────────────────────

export const auth = {
  getToken: () => localStorage.getItem('token'),
  getRefreshToken: () => localStorage.getItem('refresh_token'),
  setTokens: (token: string, refreshToken: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },
  getUser: (): User | null => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user: User) => localStorage.setItem('user', JSON.stringify(user)),
  isLoggedIn: () => !!localStorage.getItem('token'),
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  refresh_token: string;
  user: User;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role?: string;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {},
  withAuth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (withAuth) {
    const token = auth.getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message ?? body.error ?? res.statusText);
  }

  return res.json() as Promise<T>;
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
  login: (username: string, password: string) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  register: (payload: RegisterPayload) =>
    request<ApiResponse<User>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, true),

  logout: () =>
    request<ApiResponse>('/auth/logout', { method: 'POST' }, true),

  refreshToken: (refreshToken: string) =>
    request<ApiResponse<{ token: string }>>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    }),

  getProfile: () =>
    request<ApiResponse<User>>('/auth/profile', { method: 'GET' }, true),
};
