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
const UPDATED = "August 14, 2026";

export const metadata = buildMetadata({
  title: `${APP_NAME} Privacy Policy`,
  description: `Privacy policy for ${APP_NAME}, an offline boxing training companion by ${person.shortName} / Momentra Labs. Covers optional camera, microphone, and gallery access for training video. No account required; training data stays on your device.`,
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
              system operated for this version. Open the App and start training.
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
                Training sessions, goals, recovery / readiness check-ins, and
                sparring journal notes
              </li>
              <li>Saved punch combinations and macros calculator preferences</li>
              <li>
                Optional sparring photo references you choose to attach (stay on
                this device)
              </li>
              <li>
                Optional training videos you record in the App (stored in app
                storage and, if you allow Photos access, also saved to your
                device gallery in a “Gloves Up” album)
              </li>
              <li>
                Notification preference (enabled / disabled) and boxing timer
                defaults
              </li>
              <li>
                Optional local Pro / membership state if you later purchase Gloves
                Up Pro through the app store (no separate account is required)
              </li>
            </ul>
            <p>
              This information is stored using on-device storage and is{" "}
              <strong className="text-foreground">not uploaded</strong> to
              Momentra Labs servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Permissions
            </h2>
            <p>All of the following are optional. You can leave them off.</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Notifications</strong> —
                optional local reminders for training and boxing timer alerts
                (round start / end / almost done). Notifications stay on your
                device. You can turn them off in the App (You) or in system
                settings.
              </li>
              <li>
                <strong className="text-foreground">Camera</strong> — used only
                if you record optional training videos with the on-screen round
                timer and clock. Video stays on this device.
              </li>
              <li>
                <strong className="text-foreground">Microphone</strong> — used
                only while recording those training videos, to capture audio with
                the clip.
              </li>
              <li>
                <strong className="text-foreground">Photos / gallery</strong> —
                used to (1) attach an optional sparring reference photo, and/or
                (2) save training videos you record into your Photos / Gallery
                (Gloves Up album). The App does not browse your full library
                unless you choose a photo to attach.
              </li>
            </ul>
            <p>
              You can review and change these under{" "}
              <strong className="text-foreground">Camera</strong> or{" "}
              <strong className="text-foreground">You → App access</strong>, or
              in your phone’s system settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              What we do not collect
            </h2>
            <p>
              This version of {APP_NAME} does not sell personal data, does not
              run an advertising identifier / ad-tracking program, and does not
              transmit your training journal, profile, photos, or videos to a
              Momentra Labs backend service.
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
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Uninstalling the App removes locally stored App data on that
                device.
              </li>
              <li>
                Within the App,{" "}
                <strong className="text-foreground">Reset</strong> under{" "}
                <strong className="text-foreground">You</strong> erases saved
                training data and profile information on the device and returns
                you to the welcome screens.
              </li>
              <li>
                Training clips already saved to your phone’s Photos / Gallery
                remain in the gallery until you delete them there. Reset /
                uninstall does not automatically remove gallery copies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Store listings &amp; purchases
            </h2>
            <p>
              If you download {APP_NAME} from Google Play or the App Store, those
              stores may process installation and (when available) subscription or
              purchase transactions under their own privacy policies. {APP_NAME}{" "}
              does not operate a separate account system for purchases.
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
