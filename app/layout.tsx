import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-alt" });

export const metadata: Metadata = {
  title: "Alvaro Llamojha — DevOps & Observability Engineer",
  description:
    "Portfolio and résumé for Alvaro Llamojha, a DevOps and observability engineer specialising in AWS, serverless architectures, infrastructure as code, and end-to-end monitoring.",
  metadataBase: new URL("https://amllamojha.com"),
  alternates: {
    canonical: "https://amllamojha.com"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Alvaro Llamojha",
    description:
      "DevOps and observability engineer with a track record building AWS, serverless, and monitoring platforms for commerce and AI teams.",
    url: "https://amllamojha.com",
    siteName: "Alvaro Llamojha",
    locale: "en_GB",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Llamojha",
    description:
      "DevOps and observability engineer with a track record building AWS, serverless, and monitoring platforms for commerce and AI teams."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, firaCode.variable, "antialiased")}>
        <Script id="posthog-snippet" strategy="afterInteractive">
          {`
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init fi Cr Or ci Tr Ir capture Mi calculateEventProperties Ar register register_once register_for_session unregister unregister_for_session Nr getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty jr Mr createPersonProfile Lr kr Ur opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Fr debug M Dr getPageViewId captureTraceFeedback captureTraceMetric Sr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_ew2rzzGNkPOvCTa4tFj90xgchGmU8Tnj3ADHgc592jA', {
        api_host: 'https://eu.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
`}
        </Script>
        {children}
      </body>
    </html>
  );
}
