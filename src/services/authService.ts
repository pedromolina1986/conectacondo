import api from './api';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'morador' | 'condominio' | 'fornecedor';
  condominiumName?: string;
  apartment?: string;
  businessName?: string;
  businessType?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    
    const response = await api.post('/auth/login', credentials);
    
    const { token, user } = response.data;    
    if (token) {
      localStorage.setItem('auth_token', token);
    }    
    if (!user) {      
      throw new Error('Usuário não encontrado');  
    } else {      
      localStorage.setItem('user', user.email);
    }

    return response.data;
  },

  async register(userData: RegisterRequest): Promise<any> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
  },

  async getCurrentUser(): Promise<any> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
};