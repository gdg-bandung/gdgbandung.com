import {
  Download,
  Palette,
  Type,
  ImageIcon,
  ExternalLink,
  Copy,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import ContentHeader from "~/components/content/header";
import ContentFooter from "~/components/content/footer";
import { Link } from "react-router";

export default function BrandGuidelines() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const coreColors = [
    {
      name: "Blue 500",
      hex: "#4285f4",
      rgb: "66, 133, 244",
      description: "Primary brand color",
    },
    {
      name: "Green 500",
      hex: "#34a853",
      rgb: "52, 168, 83",
      description: "Success and growth",
    },
    {
      name: "Yellow 600",
      hex: "#f9ab00",
      rgb: "249, 171, 0",
      description: "Attention and energy",
    },
    {
      name: "Red 500",
      hex: "#ea4335",
      rgb: "234, 67, 53",
      description: "Alerts and emphasis",
    },
  ];

  const halftoneColors = [
    { name: "Halftone Blue", hex: "#57caff", rgb: "87, 202, 255" },
    { name: "Halftone Green", hex: "#5cdb6d", rgb: "92, 219, 109" },
    { name: "Halftone Yellow", hex: "#ffd427", rgb: "255, 212, 39" },
    { name: "Halftone Red", hex: "#ff7daf", rgb: "255, 125, 175" },
  ];

  const pastelColors = [
    { name: "Pastel Blue", hex: "#c3ecf6", rgb: "195, 236, 246" },
    { name: "Pastel Green", hex: "#ccf6c5", rgb: "204, 246, 197" },
    { name: "Pastel Yellow", hex: "#ffe7a5", rgb: "255, 231, 165" },
    { name: "Pastel Red", hex: "#f8d8d8", rgb: "248, 216, 216" },
  ];

  const grayscaleColors = [
    { name: "Off White", hex: "#f0f0f0", rgb: "240, 240, 240" },
    { name: "Black 02", hex: "#1e1e1e", rgb: "30, 30, 30" },
  ];

  const usageRules = [
    {
      type: "don't",
      title: "Don't modify the logo in any way",
      description:
        "Do not modify the logo in any way, including cropping it or removing the GDG brand name from the logo.",
    },
    {
      type: "don't",
      title: "Don't distort or recolor the logo",
      description: "Do not distort or recolor the logo.",
    },
    {
      type: "don't",
      title: "Don't use unauthorized versions",
      description:
        "It is also not permitted to use versions of the logo not provided on this page, add any effects to the logo, or rewrite the text part.",
    },
    {
      type: "don't",
      title: "Use only provided images",
      description:
        "Use only the images you downloaded on this page without making any changes to them.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ContentHeader
        title="Brand Guidelines"
        subtitle="Representing the branding of Google Developer Group Bandung"
      />

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                About GDG Bandung Brand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                These guidelines ensure that all GDG Bandung communications,
                whether from organizers, partners, or community members,
                maintain a consistent and professional appearance that reflects
                our connection to the global Google Developer community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  asChild
                >
                  <Link
                    to="https://drive.google.com/drive/folders/18gLkNtD2M72VL7yuRvVFpAgW7yQIiWTD"
                    target="_blank"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Logo Assets
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-green-600" />
                Logo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                While the{" "}
                <span className="text-blue-600 font-semibold">
                  horizontal logo is preferred
                </span>
                , the stacked logo can be used as an alternative when space is a
                limiting factor.
              </p>

              <div className="space-y-8">
                {/* Horizontal Logos */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Horizontal Logo (Preferred)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Light Horizontal */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-white p-8 flex items-center justify-center min-h-[120px]">
                        <img
                          src="/brand-guidelines/GDG Bandung - Horizontal - Light.png"
                          alt="GDG Bandung Horizontal Light Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h5 className="font-medium text-gray-900 mb-1">
                          Light Background
                        </h5>
                        <p className="text-sm text-gray-600">
                          Use on light backgrounds and white surfaces
                        </p>
                      </div>
                    </div>

                    {/* Dark Horizontal */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-900 p-8 flex items-center justify-center min-h-[120px]">
                        <img
                          src="/brand-guidelines/GDG Bandung - Horizontal - Dark.png"
                          alt="GDG Bandung Horizontal Dark Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h5 className="font-medium text-gray-900 mb-1">
                          Dark Background
                        </h5>
                        <p className="text-sm text-gray-600">
                          Use on dark backgrounds and colored surfaces
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Use horizontal format whenever possible for maximum brand
                    recognition and visual impact.
                  </p>
                </div>

                {/* Stacked Logos */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Stacked Logo (Alternative)
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Light Stacked */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-white p-8 flex items-center justify-center min-h-[160px]">
                        <img
                          src="/brand-guidelines/GDG Bandung Professional - Stacked - Light.png"
                          alt="GDG Bandung Stacked Light Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h5 className="font-medium text-gray-900 mb-1">
                          Light Background
                        </h5>
                        <p className="text-sm text-gray-600">
                          Stacked version for light backgrounds
                        </p>
                      </div>
                    </div>

                    {/* Dark Stacked */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-900 p-8 flex items-center justify-center min-h-[160px]">
                        <img
                          src="/brand-guidelines/GDG Bandung Professional - Stacked - Dark.png"
                          alt="GDG Bandung Stacked Dark Logo"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h5 className="font-medium text-gray-900 mb-1">
                          Dark Background
                        </h5>
                        <p className="text-sm text-gray-600">
                          Stacked version for dark backgrounds
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Use stacked format when horizontal space is limited or for
                    square format applications.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-orange-600" />
                Typography Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Google Developer Groups use specific typography to maintain
                consistency with Google's design system.
              </p>

              <div className="space-y-6">
                {/* Google Sans */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 text-xl">
                      Google Sans - Main Typeface
                    </h4>
                    <p className="text-gray-700">
                      Is the main typeface. Use a combination of bold and
                      regular for titles or large sentences, so that the design
                      is not too heavy.
                    </p>
                    <p className="text-gray-700">
                      For paragraphs with smaller type point, use the Regular
                      variable.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <Badge variant="outline">Normal (400)</Badge>
                      <Badge variant="outline">Bold (700)</Badge>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border">
                      <p className="text-2xl font-normal mb-2">
                        Google Sans Normal
                      </p>
                      <p className="text-2xl font-bold">Google Sans Bold</p>
                    </div>
                  </div>
                </div>

                {/* Google Sans Mono */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900 text-xl">
                      Google Sans Mono - Secondary Typeface
                    </h4>
                    <p className="text-gray-700">
                      Is the secondary typeface and its function is to bring
                      variety and the perception of "code-style writing" to the
                      piece.
                    </p>
                    <p className="text-gray-700">
                      It is used for short lines, talent names or additional
                      data in small scale use.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <Badge variant="outline">Normal (400)</Badge>
                      <Badge variant="outline">Bold (700)</Badge>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border">
                      <p className="text-lg font-normal mb-2 font-mono">
                        Google Sans Mono Normal
                      </p>
                      <p className="text-lg font-bold font-mono">
                        Google Sans Mono Bold
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                Official Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                GDG Bandung uses Google's official brand colors to maintain
                consistency with the global Google Developer community. We
                started from the core color and went towards more pastel colors,
                without losing the brightness and saturation.
              </p>

              <div className="space-y-6">
                {/* Core Colors */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Core Colors
                  </h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {coreColors.map((color, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                      >
                        <div
                          className="h-20 w-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="p-3">
                          <h5 className="font-semibold text-gray-900 text-sm mb-1">
                            {color.name}
                          </h5>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-mono text-gray-700">
                              {color.hex}
                            </p>
                            <Copy className="h-3 w-3 text-gray-400" />
                          </div>
                          <p className="text-xs text-gray-500">
                            {color.description}
                          </p>
                          {copiedColor === color.name && (
                            <p className="text-xs text-green-600 mt-1">
                              Copied!
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Halftones */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Halftones
                  </h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {halftoneColors.map((color, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                      >
                        <div
                          className="h-16 w-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-1">
                            {color.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-gray-700">
                              {color.hex}
                            </p>
                            <Copy className="h-3 w-3 text-gray-400" />
                          </div>
                          {copiedColor === color.name && (
                            <p className="text-xs text-green-600 mt-1">
                              Copied!
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pastels */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Pastels</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pastelColors.map((color, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                      >
                        <div
                          className="h-16 w-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-1">
                            {color.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-gray-700">
                              {color.hex}
                            </p>
                            <Copy className="h-3 w-3 text-gray-400" />
                          </div>
                          {copiedColor === color.name && (
                            <p className="text-xs text-green-600 mt-1">
                              Copied!
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grayscale */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Grayscale
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {grayscaleColors.map((color, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => copyToClipboard(color.hex, color.name)}
                      >
                        <div
                          className="h-16 w-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className="p-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-1">
                            {color.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-gray-700">
                              {color.hex}
                            </p>
                            <Copy className="h-3 w-3 text-gray-400" />
                          </div>
                          {copiedColor === color.name && (
                            <p className="text-xs text-green-600 mt-1">
                              Copied!
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Color Usage Notes
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • Use RGB values for digital applications (web, mobile,
                    digital displays)
                  </li>
                  <li>
                    • For print materials, refer to PANTONE color codes when
                    available
                  </li>
                  <li>
                    • Maintain sufficient contrast ratios for accessibility
                    compliance
                  </li>
                  <li>
                    • Click any color above to copy its hex code to your
                    clipboard
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          {/* Usage Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-gdg-red" />
                Logo Usage Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Follow these guidelines to ensure proper use of the GDG logo and
                maintain brand integrity.
              </p>

              <div>
                <h4 className="font-semibold text-gdg-red mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  Don'ts
                </h4>
                <div className="space-y-4">
                  {usageRules
                    .filter((rule) => rule.type === "don't")
                    .map((rule, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-gdg-red pl-4"
                      >
                        <h5 className="font-medium text-gray-900 mb-1">
                          {rule.title}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {rule.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Footer Actions */}
        <ContentFooter
          description="These brand guidelines are based on official Google Developer Groups
            standards. Please check this page for updates and download the most
            recent logo files from our official repository."
          link={{
            href: "https://drive.google.com/drive/folders/18gLkNtD2M72VL7yuRvVFpAgW7yQIiWTD",
            label: "Download Logo Assets",
            target: "_blank",
          }}
        />
      </div>
    </div>
  );
}
