export function getStatus(quantity: number){
  if (quantity === 0) return "Indisponível";
  return "Em estoque";
}