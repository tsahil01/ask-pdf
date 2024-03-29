export function User( {email, name, image}: { email: string; name: string; image: string } ) {
  return (
    <button className="w-8 my-auto">
      <img className="rounded-full" src={ image } alt={ name } />
    </button>
  );
}
