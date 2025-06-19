import { z } from 'zod';

export function formatDate(value) {
  let v = value.replace(/\D/g, "");
  if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
  if (v.length >= 5) v = v.slice(0, 5) + "/" + v.slice(5, 9);
  if (v.length > 10) v = v.slice(0, 10);
  return v;
}

export function formatCPF(value) {
  let v = value.replace(/\D/g, "");
  if (v.length > 3) v = v.slice(0, 3) + "." + v.slice(3);
  if (v.length > 7) v = v.slice(0, 7) + "." + v.slice(7);
  if (v.length > 11) v = v.slice(0, 11) + "-" + v.slice(11, 13);
  if (v.length > 14) v = v.slice(0, 14);
  return v;
}

export function formatRG(value) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
}


export function formatTelefone(value) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 11) digits = digits.slice(0, 11);
  
  if (digits.length <= 10) {
    const ddd = digits.slice(0, 2);
    const firstPart = digits.slice(2, 6);
    const secondPart = digits.slice(6);
    return `(${ddd})${firstPart ? ' ' + firstPart : ''}${secondPart ? '-' + secondPart : ''}`;
  }
  //celular//
  const ddd = digits.slice(0, 2);
  const firstPart = digits.slice(2, 7);
  const secondPart = digits.slice(7);
  return `(${ddd})${firstPart ? ' ' + firstPart : ''}${secondPart ? '-' + secondPart : ''}`;
}

export const FormCardSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório e deve ter mais de duas letras").optional(),

  cpf: z
    .string()
    .refine((value) => value.replace(/\D/g, "").length === 11, {
      message: "CPF deve conter exatamente 11 dígitos",
    }).optional(),

  rg: z
    .string()
    .refine((value) => value.replace(/\D/g, "").length === 9, {
      message: "RG deve conter exatamente 9 dígitos",
    }).optional(),

  telefone: z
    .string()
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length === 10 || digits.length === 11;
    }, {
      message: "Telefone deve conter 10 ou 11 dígitos",
    }).optional(),

  uf: z.string().min(2, "UF inválida").optional(),

  genero: z.string().min(1, "Escolha um gênero").optional(),

  apartamento: z.string().min(1, "Informe o número do apartamento").optional(),

  bloco: z.string().min(1, "Informe o bloco").optional(),

  dataEntrada: z
    .string()
    .refine((value) => formatDate(value).length === 10, {
      message: "Data inválida",
    }).optional(),

  data: z
    .string()
    .refine((value) => formatDate(value).length === 10, {
      message: "Data inválida",
    }).optional(),


    dataSaida: z
    .string()
    .refine((value) => formatDate(value).length === 10, {
      message: "Data inválida",
    }).optional(),


  id_unidade: z.string().min(2, "Informe o id_unidade").optional(),

  visitantes: z.string().min(1, "Selecione um nível de acesso").optional(),

empresa: z.string().min(4, "Informe uma empresa").optional(),

status_entrega: z.string().min(8, "Informe uma empresa").optional(),


});
