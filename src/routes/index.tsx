import { Title } from "@solidjs/meta";
import { Link } from '~/components/base/link'
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <Link href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </Link>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
