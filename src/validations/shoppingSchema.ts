import { z } from "zod";

export const shoppingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe pelo menos 2 caracteres")
    .max(80, "Use um nome mais curto"),
  quantity: z.coerce
    .number({ invalid_type_error: "Informe a quantidade" })
    .int("Use um número inteiro")
    .min(1, "A quantidade mínima é 1")
    .max(999, "Quantidade muito alta"),
  price: z.coerce
    .number({ invalid_type_error: "Informe o valor" })
    .min(0.01, "Informe um valor maior que zero")
    .max(999999, "Valor muito alto")
});

export type ShoppingFormData = z.infer<typeof shoppingSchema>;
