

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
      <p className="text-lg mb-8">Desculpe, a página que você está procurando não existe.</p>
      <a href="/" className="text-blue-500 hover:underline">
        Voltar para a página inicial
      </a>
    </div>
  );
}