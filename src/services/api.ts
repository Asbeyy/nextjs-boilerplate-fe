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

export const getAllProfiles = async (page: number, limit:number, search: string, filter?: string) => {
  const response = await fetch(`${API_URL}/account/profiles/all?page=${page}&limit=${limit}&search=${search}&filter=${filter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const getAllOperators = async () => {
  const response = await fetch(`${API_URL}/account/operators/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/account/users/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const createManualProfile = async (name: string, surname: string, email: string, type: string) => {
  const response = await fetch(`${API_URL}/account/admin/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, surname, email, type }),
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


/* Leads */
export const getAllLeads = async (page: number, limit:number, search:string ,filter?: string) => {
  const response = await fetch(`${API_URL}/leads/all?page=${page}&limit=${limit}&filter=${filter}&search=${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const getLead = async (id: string) => {
  const response = await fetch(`${API_URL}/leads/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const updateLeadStatus = async (id: string, status: string) => {
  const response = await fetch(`${API_URL}/leads/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  return await response.json();
}
export const updateLeadEmail = async (id: string, email: string) => {
  const response = await fetch(`${API_URL}/leads/${id}/email`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email }),
  });

  return await response.json();
}


/* Project */
export const getAllProjects = async (filter?: string) => {
  const response = await fetch(`${API_URL}/projects?filter=${filter}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const getProject = async (id: string) => {}

export const createProjectAdmin = async (name: string, description: string, operators: string[], ownerId: string) => {
  const response = await fetch(`${API_URL}/projects/admin/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, description, operators, ownerId }),
  });

  return await response.json();
}
export const createProjectCustomer = async (name: string, description: string, operators: string[]) => {
  const response = await fetch(`${API_URL}/projects/user/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, description, operators }),
  });

  return await response.json();
}
export const updateProjectOperators = async (id: string, operators: string[]) => {
  const response = await fetch(`${API_URL}/projects/update/operators/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ operators }),
  });

  return await response.json();
}
export const getTaskById = async (taskId: string) =>{
  const response = await fetch(`${API_URL}/projects/task/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  return await response.json();
}
export const addTaskToProject = async (projectId: string, title: string,  status: string) => {


  const response = await fetch(`${API_URL}/projects/task/add/${projectId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({  title,  status }),
  });

  return await response.json();
}
export const getAllTasksProject = async (projectId: string) => {
  const response = await fetch(`${API_URL}/projects/task/get/${projectId}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  return await response.json();
}
export const updateTaskStatus = async ( taskId: string, status: string) => {
  const response = await fetch(`${API_URL}/projects/task/update/status/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });

  return await response.json();
}


