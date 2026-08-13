import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { JsonLd } from "@/components/shared/json-ld";
import { person } from "@/content/person";
import {
  breadcrumbSchema,
  graphSchema,
  personSchema,
  webPageSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = "/apps/gloves-up/privacy/";
const APP_NAME = "Gloves Up";
const UPDATED = "August 13, 2026";

export const metadata = buildMetadata({
  title: `${APP_NAME} Privacy Policy`,
  description: `Privacy policy for ${APP_NAME}, an offline boxing training companion by ${person.shortName} / Momentra Labs. No account required; training data stays on your device.`,
  path: PATH,
});

export default function GlovesUpPrivacyPage() {
  const schema = graphSchema([
    personSchema(),
    webPageSchema({
      path: PATH,
      name: `${APP_NAME} Privacy Policy`,
      description: `Privacy policy for the ${APP_NAME} mobile app.`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Gloves Up Privacy", path: PATH },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        label="Privacy"
        title={`${APP_NAME} Privacy Policy`}
        description="Offline-first boxing training companion. Your data stays on your phone."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Gloves Up Privacy" },
        ]}
      />
      <Container className="py-16">
        <article className="prose-portfolio mx-auto max-w-3xl space-y-8 text-muted">
          <p className="text-sm text-foreground/70">Last updated: {UPDATED}</p>

          <p>
            <strong className="text-foreground">{APP_NAME}</strong> (“the App”)
            is a personal boxing training companion developed by{" "}
            <strong className="text-foreground">Momentra Labs</strong> (
            {person.name}). It is designed to work offline and keep your
            training information on your device.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              No accounts
            </h2>
            <p>
              The App does not require signup or login. There is no cloud account
              system operated for this version.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Information stored on your device
            </h2>
            <p>Depending on how you use the App, it may store locally:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Basic profile details such as name, age, stance, experience, and
                discipline
              </li>
              <li>
                Training sessions, goals, recovery check-ins, and sparring journal
                notes
              </li>
              <li>Optional sparring photo references you choose to attach</li>
              <li>Saved punch combinations and macros calculator preferences</li>
              <li>Notification preference (enabled/disabled)</li>
            </ul>
            <p>
              This information is stored using on-device storage and is not
              uploaded to Momentra Labs servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Permissions
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Notifications</strong> —
                optional local reminders for training. You can disable them in
                the App or system settings.
              </li>
              <li>
                <strong className="text-foreground">Photos</strong> — optional
                attachment of sparring reference images that remain on your
                device.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              What we do not collect
            </h2>
            <p>
              This version of {APP_NAME} does not sell personal data, does not
              run an advertising identifier program, and does not transmit your
              training journal to a backend service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Children
            </h2>
            <p>
              The App is intended for general audiences interested in boxing
              training tools. Do not enter personal information for children if
              you are not authorized to do so.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Data deletion
            </h2>
            <p>
              Uninstalling the App removes locally stored App data. Within the
              App, Reset under You erases saved data on the device and returns
              you to the welcome screens.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Contact
            </h2>
            <p>
              For privacy questions about {APP_NAME}, contact{" "}
              <a
                href={`mailto:${person.email}`}
                className="text-accent hover:underline"
              >
                {person.email}
              </a>{" "}
              or use the{" "}
              <Link href="/contact/" className="text-accent hover:underline">
                contact form
              </Link>{" "}
              on this site.
            </p>
          </section>

          <p className="border-t border-border pt-6 text-sm">
            Developer: Momentra Labs · {person.name} ·{" "}
            <Link href="/" className="text-accent hover:underline">
              albeltran.com
            </Link>
          </p>
        </article>
      </Container>
    </>
  );
}
