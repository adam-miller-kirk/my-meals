import Link from "next/link";

function Header() {
  return (
    <div className="flex gap-2 m-2">
      <Link href="/">Home</Link>
      <Link href="/planning">Planning</Link>
      <Link href="/shopping">Shopping</Link>
      <Link href="/recipes">Recipes</Link>
    </div>
  );
}

export default Header;
