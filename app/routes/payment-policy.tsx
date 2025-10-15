import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ContentHeader from "~/components/content/header";
import ContentFooter from "~/components/content/footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <ContentHeader
        title="Payment Policy"
        subtitle="Secure payment, refund, and transaction procedures for Google Developer Group (GDG) Bandung"
      />

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="space-y-8">
          {/* Methods */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                1. Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4 list-disc ml-6 text-gray-700">
                <li>
                  All payments are processed securely through{" "}
                  <strong>iPaymu</strong>.
                </li>
                <li>
                  Accepted payment methods include:
                  <ul>
                    <li>Bank Transfer (Virtual Account)</li>
                    <li>QRIS</li>
                    <li>
                      (Optional: credit/debit cards or e-wallets, depending on
                      iPaymu’s supported options)
                    </li>
                  </ul>
                </li>
                <li>
                  Payments are accepted in{" "}
                  <strong>Indonesian Rupiah (IDR)</strong> only.
                </li>
                <li>
                  Users without an iPaymu account can still make payments
                  through available methods such as Virtual Account or bank
                  transfer.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Procedure */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                2. Payment Procedure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  After selecting a product or service and proceeding to
                  checkout, users will be redirected to the iPaymu payment page.
                </li>
                <li>
                  Choose your preferred payment method (e.g., Virtual Account,
                  QRIS, etc.).
                </li>
                <li>
                  Enter the required information (name, email, or phone number,
                  if requested).
                </li>
                <li>
                  iPaymu will display the payment instructions, such as a
                  Virtual Account number or QR code, and send details via SMS or
                  email.
                </li>
                <li>
                  Complete the payment according to the instructions provided.
                </li>
                <li>
                  Once the payment is verified, your order or service access
                  will be automatically processed.
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* Confirmation & Processing Time */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                3. Payment Confirmation & Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Payments made through Virtual Account or QRIS are usually
                  verified automatically within a few minutes, depending on the
                  payment method and bank network.
                </li>
                <li>
                  If your payment has not been confirmed after a reasonable
                  period, please contact our support team with proof of payment.
                </li>
                <li>
                  Ensure that you make payment to the correct Virtual Account
                  number. GDG Bandung is not responsible for payments made to
                  the wrong account.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Fees */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                4. Transaction Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Each transaction made through iPaymu may incur a{" "}
                  <strong>transaction fee</strong> according to iPaymu's
                  applicable rates.
                </li>
                <li>
                  The fee is automatically deducted or included in the total
                  amount during the checkout process.
                </li>
                <li>
                  No additional charges will be imposed by GDG Bandung beyond
                  those displayed at checkout.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Deadline */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                5. Payment Deadline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Orders or registrations will be automatically canceled if
                  payment is not completed within{" "}
                  <strong>24 hours (1x24 hours)</strong> after checkout.
                </li>
                <li>
                  For special cases or extensions, please contact our admin
                  team.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Refund & Cancellation Policy
           */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                6. Refund & Cancellation Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Once payment is successfully completed and the product or
                  service has been delivered,{" "}
                  <strong>payments are non-refundable</strong>.
                </li>
                <li>
                  Refunds are only applicable if an error or cancellation occurs
                  on the part of GDG Bandung.
                </li>
                <li>
                  Refund requests can be made via our official contact or email
                  and will be reviewed accordingly.
                </li>
                <li>
                  Refunds will be processed after verification and may be
                  subject to administrative or transaction fees.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Security & Disclaimer */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                7. Security & Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  All transactions are handled securely through iPaymu's system,
                  which complies with industry-standard security practices.
                </li>
                <li>
                  GDG Bandung is not responsible for any delays caused by banks,
                  iPaymu system outages, or other third-party service
                  disruptions.
                </li>
                <li>
                  We reserve the right to reject or request additional
                  verification for any suspicious or fraudulent transactions.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="font-semibold text-xl">
                8. Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  GDG Bandung reserves the right to modify or update this
                  Payment Policy at any time without prior notice.
                </li>
                <li>
                  Updates will take effect immediately upon posting on this
                  page.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <ContentFooter
          description="By making a payment, you agree to the terms outlined in this Payment Policy and acknowledge that all transactions are processed securely."
          link={{ label: "View Code of Conduct", href: "/code-of-conduct" }}
        />
      </div>
    </div>
  );
}
