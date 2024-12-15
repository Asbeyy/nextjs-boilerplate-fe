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

//Settings
export const getSettingsProfile = async () => {
  const response = await fetch(`${API_URL}/account/settings/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  return await response.json()
}
export const updateSettingsProfilePicture = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_URL}/account/settings/profile/picture`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
    body: formData,
  })

  return await response.json()
}
export const updateSettingsProfileName = async (name: string, surname: string, birthdate: string, address: string, phone: string ) => {
  const response = await fetch(`${API_URL}/account/settings/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, surname, birthdate, address, phone }),
  })

  return await response.json()
}
export const getSettingsAccess = async () => {
  const response = await fetch(`${API_URL}/account/settings/access`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  return await response.json()
}
export const updateSettingsAccessEmail = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/account/settings/access/email`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email, password }),
  })

  return await response.json()
}
export const updateSettingsAccessPassword = async (password: string, newPassword: string) => {
  const response = await fetch(`${API_URL}/account/settings/access/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ password, newPassword }),
  })

  return await response.json()
}

export const addPaymentMethod = async (cardNumber: string, cardHolder: string, expirationDate: string, cvv: string) => {
  //Filter and trim the cardNumber
  cardNumber = cardNumber.replace(/\s/g, '')


  const response = await fetch(`${API_URL}/payments/methods/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ cardNumber, cardHolder, expirationDate, cvv }),
  })

  return await response.json()
}
export const removePaymentMethod = async (id: string) => {
  const response = await fetch(`${API_URL}/payments/methods/remove/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  return await response.json()
}
export const getCurrentPaymentMethod = async () => {
  const response = await fetch(`${API_URL}/payments/methods/current`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  return await response.json()
}
export const getAllPaymentMethods = async () => {
  const response = await fetch(`${API_URL}/payments/methods/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  return await response.json()
}
export const updatePaymentMethodEmail = async (paymentMethodId: string,email: string) => {
  const response = await fetch(`${API_URL}/payments/methods/update/${paymentMethodId}/email`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ paymentMethodId, email }),
  })

  return await response.json()
}
export const updatePaymentMethodDefault = async (paymentMethodId: string) => {
  const response = await fetch(`${API_URL}/payments/methods/update/${paymentMethodId}/default`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ paymentMethodId }),
  })

  return await response.json()
}

