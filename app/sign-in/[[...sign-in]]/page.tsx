import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // full viewport height
        background: "linear-gradient(1200px 600px at 15% -10%, #0d1b3a, transparent), radial-gradient(900px 500px at 90% 10%, #1a0f3d, transparent), var(--bg)", // optional: match your app background
      }}
    >
      <SignIn />
    </div>
  );
}