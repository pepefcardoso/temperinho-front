import { z } from 'zod';

export const companySchema = z.object({
  name: z
    .string()
    .min(3, 'O nome da empresa precisa ter pelo menos 3 caracteres.'),
  cnpj: z.string().length(14, 'O CNPJ deve ter 14 dígitos.'),
  email: z.string().email('Por favor, insira um email válido.'),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url('Por favor, insira uma URL válida.').optional(),
});
