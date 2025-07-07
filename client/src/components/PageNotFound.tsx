import { Link } from '@heroui/link';

export default function PageNotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-2xl">You followed an invalid link (Error 404)!</h1>
        <Link href="/">Click here</Link> to return to the home page
      </div>
    </section>
  );
}
