import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ContentHeader from "~/components/content/header";
import ContentFooter from "~/components/content/footer";

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ContentHeader
        title="Event Code of Conduct & Anti-Harassment Policy"
        subtitle="Community Guidelines for Google Developer Group Bandung"
      />

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                GDG Bandung is dedicated to providing a harassment-free and
                inclusive event experience for everyone regardless of gender
                identity and expression, sexual orientation, disabilities,
                neurodiversity, physical appearance, body size, ethnicity,
                nationality, race, age, religion, or other protected category.
                We do not tolerate harassment of event participants in any form.
                GDG Bandung takes violations of our policy seriously and will
                respond appropriately.
              </p>
              <p className="font-semibold">
                All participants of GDG Bandung events must abide by the
                following policy:
              </p>
              <ol className="list-decimal space-y-2 ml-6">
                <li>
                  Be excellent to each other. We want the event to be an
                  excellent experience for everyone regardless of gender
                  identity and expression, sexual orientation, disabilities,
                  neurodiversity, physical appearance, body size, ethnicity,
                  nationality, race, age, religion, or other protected category.
                  Treat everyone with respect. Participate while acknowledging
                  that everyone deserves to be here -- and each of us has the
                  right to enjoy our experience without fear of harassment,
                  discrimination, or condescension, whether blatant or via
                  micro-aggressions. Jokes shouldn’t demean others. Consider
                  what you are saying and how it would feel if it were said to
                  or about you.
                </li>
                <li>
                  Speak up if you see or hear something. Harassment is not
                  tolerated, and you are empowered to politely engage when you
                  or others are disrespected. The person making you feel
                  uncomfortable may not be aware of what they are doing, and
                  politely bringing their behavior to their attention is
                  encouraged. If a participant engages in harassing or
                  uncomfortable behavior, the event organizers may take any
                  action they deem appropriate, including warning or expelling
                  the offender from the event with no refund. If you are being
                  harassed or feel uncomfortable, notice that someone else is
                  being harassed, or have any other concerns, please contact a
                  member of the event staff immediately.
                </li>
                <li>
                  Harassment is not tolerated. Harassment includes, but is not
                  limited to: verbal language that reinforces social structures
                  of domination related to gender identity and expression,
                  sexual orientation, disabilities, neurodiversity, physical
                  appearance, body size, ethnicity, nationality, race, age,
                  religion, or other protected category; sexual imagery in
                  public spaces; deliberate intimidation; stalking; following;
                  harassing photography or recording; sustained disruption of
                  talks or other events; offensive verbal language;
                  inappropriate physical contact; and unwelcome sexual
                  attention. Participants asked to stop any harassing behavior
                  are expected to comply immediately.
                </li>
                <li>
                  Practice saying <strong>"Yes And"</strong> to each other. It's
                  a theatre improv technique to build on each other's ideas. We
                  all benefit when we create together.
                </li>
              </ol>
              <p>
                This policy extends to talks, forums, workshops, codelabs,
                social media, parties, hallway conversations, all attendees,
                partners, sponsors, volunteers, event staff, etc. You catch our
                drift. GDG Bandung reserves the right to refuse admittance to,
                or remove any person from, any GDG Bandung hosted event
                (including future GDG Bandung events) at any time in its sole
                discretion. This includes, but is not limited to, attendees
                behaving in a disorderly manner or failing to comply with this
                policy, and the terms and conditions herein. If a participant
                engages in harassing or uncomfortable behavior, the event
                organizers may take any action they deem appropriate, including
                warning or expelling the offender from the event with no refund.
              </p>
              <p>
                Our event staff can usually be identified by special
                badges/attire. Our zero tolerance policy means that we will look
                into and review every allegation of violation of our Event
                Community Guidelines and Anti-Harassment Policy and respond
                appropriately. Please note, while we take all concerns raised
                seriously, we will use our discretion as to determining when and
                how to follow up on reported incidents, and may decline to take
                any further action and/or may direct the participant to other
                resources for resolution.
              </p>
              <p>
                Event staff will be happy to help participants contact
                hotel/venue security or local law enforcement, provide escorts,
                or otherwise assist those experiencing discomfort or harassment
                to feel safe for the duration of the event. We value your
                attendance.
              </p>
              <p>
                Exhibiting partners, sponsors or vendor booths, or similar
                activities are also subject to this policy. In particular,
                exhibitors should not use sexualized images, activities, or
                other material. Booth staff (including volunteers) should not
                use sexualized clothing/uniforms/costumes, or otherwise create a
                sexualized environment. Participants and exhibiting partners or
                sponsors disobeying this policy will be notified and are
                expected to stop any offending behavior immediately.
              </p>
            </CardContent>
          </Card>

          {/* Why This Policy is Important */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                Why This Policy is Important
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Harassment at events and in online communities is unfortunately
                common. Creating an official policy aims to improve this by
                making it clear that harassment of anyone for any reason is not
                acceptable within our events and communities. This policy may
                prevent harassment by clearly defining expectations for
                behavior, aims to provide reassurance, and encourages people who
                have had bad experiences at other events to participate in this
                one.
              </p>
            </CardContent>
          </Card>

          {/* License and Attribution */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                License and Attribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This policy is licensed under the{" "}
                <a
                  href="https://creativecommons.org/publicdomain/zero/1.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gdg-blue hover:underline"
                >
                  Creative Commons Zero license.
                </a>
              </p>
              <p className="text-gray-700 leading-relaxed">
                This policy is based on and influenced by several other
                community policies including: Ohio LinuxFest Anti-Harassment
                policy, Con Anti-Harassment Project, Geek Feminism Wiki (created
                by the Ada Initiative), ConfCodeofConduct.com, JSconf, Rust,
                Diversity in Python, and Write/Speak/Code.
              </p>
            </CardContent>
          </Card>
        </div>

        <ContentFooter
          description="By participating in GDG Bandung activities, you agree to abide by this Code of Conduct."
          links={[
            {
              label: "View Terms and Conditions",
              href: "/terms-and-conditions",
            },
            { label: "View Payment Policy", href: "/payment-policy" },
          ]}
        />
      </div>
    </div>
  );
}
