import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordProps {
  name: string;
  resetPasswordToken?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function ResetPasswordEmailComponent({
  name,
  resetPasswordToken,
}: ResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>MiniStash - Reset Password</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}></Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>Hi {name},</Text>
              <Text style={mainText}>
                Someone recently requested a password change for your MiniStash
                account. If this was you, you can set a new password here:
              </Text>
              <Link href={`${baseUrl}/auth/reset?token=${resetPasswordToken}`}>
                Reset your password
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "oklch(0.2679 0.0036 106.6427)",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const mainText = { ...text, marginBottom: "14px" };
