import {
  CodewarsAuthoredTable,
  CodewarsRecordMeta,
  CodewarsRecordTable,
} from "@/components/home/codewars-record-table";
import { Container } from "@/components/shared/container";
import { Reveal, SpreadRule } from "@/components/shared/reveal";

export function WorldMarks() {
  return (
    <section
      id="record"
      aria-label="The record"
      className="magazine-spread scroll-mt-24 border-b border-border py-10 sm:py-12"
    >
      <Container>
        <Reveal>
          <p className="magazine-spread-kicker">Vol. 01 / The record</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Problems I solved on Codewars
          </h2>
          <CodewarsRecordMeta />
        </Reveal>
        <SpreadRule className="mt-5" />
        <CodewarsRecordTable />
        <Reveal className="mt-12">
          <h3
            id="authored-kata"
            className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            Authored kata
          </h3>
        </Reveal>
        <SpreadRule className="mt-5" />
        <CodewarsAuthoredTable />
      </Container>
    </section>
  );
}
