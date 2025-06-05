import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ContentHeader from "~/components/content/header";
import {
  AlertTriangle,
  Handshake,
  Mail,
  Shield,
  Target,
  Users,
} from "lucide-react";
import ContentFooter from "~/components/content/footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ContentHeader
        title="Terms and Conditions"
        subtitle="Media Partnership with Google Developer Group (GDG) Bandung"
      />

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This document ("Terms and Conditions") governs the media
                partnership between Google Developer Group (GDG) Bandung ("GDG
                Bandung", "We", "Us") and the event organizer ("You", "Event
                Organizer") who applies for GDG Bandung to be a Media Partner.
                By submitting a media partnership application to GDG Bandung,
                you are deemed to have read, understood, and agreed to all
                points listed in these Terms and Conditions.
              </p>
            </CardContent>
          </Card>

          {/* Definitions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gdg-blue" />
                Definitions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    GDG Bandung:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    A developer community focused on Google technologies in
                    Bandung, acting as the party providing media support.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Event Organizer:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    An entity or individual organizing an event and submitting a
                    request to GDG Bandung to become a Media Partner.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Event:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Activities, meetings, workshops, seminars, conferences, or
                    other initiatives organized by the Event Organizer and
                    subject to this media partnership.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Promotional Materials:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Logos, posters, press releases, articles, social media
                    content, and other materials provided by the Event Organizer
                    for publication by GDG Bandung, or derivative materials
                    created by GDG Bandung based on information from the Event
                    Organizer with approval.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Media Partnership:
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    A collaborative agreement wherein GDG Bandung provides
                    publication support for the Event Organizer's Event in
                    accordance with these Terms and Conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-gdg-green" />
                Objectives of Media Partnership with GDG Bandung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">We aim to:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  Help expand the reach of information and publicity for your
                  event to the GDG Bandung audience and the wider technology
                  community.
                </li>
                <li>
                  Build mutually beneficial and sustainable relationships.
                </li>
                <li>
                  Jointly support the growth of the technology and developer
                  ecosystem, especially in Bandung and its surroundings.
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* What GDG Bandung Offers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5 text-gdg-blue" />
                What Can GDG Bandung Offer as a Media Partner?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                As a Media Partner, GDG Bandung can provide publication support
                through our channels, which may include (but is not limited to,
                and will be adjusted based on specific agreements):
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Social Media Publication:</strong> Posting your event
                  information on GDG Bandung's official social media accounts
                  (e.g., Instagram, Twitter/X, Facebook, LinkedIn),
                  mentioning/tagging your official account.
                </li>
                <li>
                  <strong>Sharing with Internal Community:</strong>{" "}
                  Disseminating event information to GDG Bandung members'
                  mailing lists or internal communication groups.
                </li>
                <li>
                  <strong>Other Forms of Support:</strong> Depending on the
                  scale of the event and the agreement, other forms of support
                  can be discussed (e.g., a brief announcement at GDG Bandung's
                  regular events if relevant and feasible).
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What We Expect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gdg-red" />
                What We Expect from You (Event Organizer)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                To ensure an effective and mutually beneficial partnership, we
                expect the following from the Event Organizer:
              </p>
              <ol className="space-y-4 list-decimal ml-6">
                <li>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Clear Information and Materials:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      Provide complete, accurate, and up-to-date information
                      about your event.
                    </li>
                    <li>
                      Provide official promotional materials (Event Organizer's
                      logo, event logo, digital poster, short and detailed event
                      description, registration/information links, brand
                      guidelines if any) in an appropriate format.
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Recognition as a Media Partner:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      Clearly display the GDG Bandung logo as a Media Partner on
                      your event's promotional materials (e.g., event website,
                      posters, your social media publications, backdrop if any).
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Additional Benefits (Optional and Discussable):
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      Allocation of free tickets for GDG Bandung representatives
                      to attend your event.
                    </li>
                    <li>
                      Opportunity for GDG Bandung to give a brief welcome speech
                      or community introduction session at your event (if
                      relevant).
                    </li>
                    <li>
                      Provision of a booth/space for GDG Bandung (if available
                      and your event is large-scale).
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Good Communication:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>
                      Notify GDG Bandung as soon as possible of any significant
                      changes, postponements, or cancellations of the event.
                    </li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Content Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Content and Publication Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  GDG Bandung will publish accurate content and maintain the
                  good reputation of all parties.
                </li>
                <li>
                  We reserve the right not to promote events or content that
                  conflict with GDG Bandung's core values, Google Community
                  Guidelines, or contain elements of SARA (ethnicity, religion,
                  race, inter-group relations), pornography, hate speech, and
                  illegal matters. The final decision on published content rests
                  with the GDG Bandung team.
                </li>
                <li>
                  The promotional materials you provide will be used as the
                  basis for our publications. Minor changes for platform
                  adjustment may be made by us. For substantial changes, we will
                  discuss them with you first.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Logo Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Logo Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  You grant GDG Bandung the right to use your logo and event
                  name for promotional purposes as part of the media
                  partnership.
                </li>
                <li>
                  GDG Bandung will provide our official logo for you to feature
                  as a Media Partner. Please use the logo according to the
                  guidelines we provide (if any) and do not alter it without
                  permission.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gdg-green" />
                Media Partnership Application Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                If you are interested in having GDG Bandung as a Media Partner
                for your event, please contact us via{" "}
                <a href="mailto:hi@gdgbandung.com" className="font-semibold">
                  hi@gdgbandung.com
                </a>{" "}
                with a detailed event proposal, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Event name and description.</li>
                <li>Target audience.</li>
                <li>Event date and location.</li>
                <li>Details of the support you expect from GDG Bandung.</li>
                <li>Details of the benefits you offer to GDG Bandung.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our team will review your proposal and will contact you for
                further discussion if your proposal aligns with our focus and
                capacity.
              </p>
            </CardContent>
          </Card>

          {/* Event Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-gdg-yellow" />
                Event Cancellation or Changes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  If your event is canceled or postponed, please inform us as
                  soon as possible.
                </li>
                <li>
                  GDG Bandung reserves the right to review or cease publication
                  support if there are significant changes to the event that no
                  longer align with the initial agreement or our values.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle>Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  This media partnership is a collaborative publication support
                  and does not create an agency relationship, formal business
                  partnership, or joint venture.
                </li>
                <li>
                  GDG Bandung is not responsible for the technical execution,
                  event content (beyond what we deliver if there is a session
                  from GDG Bandung), or any consequences arising from the event
                  organized by your party. Full responsibility for the event
                  remains with the Event Organizer.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold text-center mt-6 p-4 bg-blue-50 rounded-lg">
                We are enthusiastic about collaborating and supporting positive
                events that can develop the technology ecosystem in Indonesia!
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This document may be updated by GDG Bandung at any time. The
                latest version will always be available on this page.
              </p>
            </CardContent>
          </Card>
        </div>

        <ContentFooter
          description="By proceeding with media partnership activities, you acknowledge that you have read, understood, and agree
            to these Terms and Conditions."
          link={{ label: "View Code of Conduct", href: "/code-of-conduct" }}
        />
      </div>
    </div>
  );
}
