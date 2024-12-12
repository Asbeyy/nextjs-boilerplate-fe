const API_URL = process.env.NEXT_PUBLIC_API_URL


//Token
export const setToken = (token: string) => {
  localStorage.setItem(String(process.env.NEXT_PUBLIC_PLATFORM_TOKEN_NAME), token);
}
export const getToken = () => {
  return localStorage.getItem(String(process.env.NEXT_PUBLIC_PLATFORM_TOKEN_NAME));
}

//Account
export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return await response.json();
};
export const register = async (name: string, surname: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/account/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
    });
    
    return await response.json();
}
export const sendVerificationEmail = async (email: string) => {
  const response = await fetch(`${API_URL}/account/verify/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  return await response.json();
}
export const verifyEmail = async (email: string, token: string) => {
  const response = await fetch(`${API_URL}/account/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, token }),
  });

  return await response.json();
}
export const logout = () => {
  localStorage.removeItem(String(process.env.NEXT_PUBLIC_PLATFORM_TOKEN_NAME));
  location.href = '/auth/login';
}
export const authenticate = async () => {
  const token = getToken();
  if (!token) {
    return null;
  }

  const response = await fetch(`${API_URL}/account/authenticate`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
}


