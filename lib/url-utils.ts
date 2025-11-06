const DEFAULT_SITE_URL = "https://quantumleapdigital.vercel.app";

export function normalizeSiteUrl(rawValue: string | undefined): string {
  const trimmed = (rawValue ?? "").trim();
  if (!trimmed) return DEFAULT_SITE_URL;

  const withoutTrailing = trimmed.replace(/\/+$/, "");
  const protocolFixed = withoutTrailing.replace(/^\/\//, "https://");
  const withScheme = /^(https?:)\/\//i.test(protocolFixed)
    ? protocolFixed
    : `https://${protocolFixed}`;

  try {
    return new URL(withScheme).toString().replace(/\/+$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export { DEFAULT_SITE_URL };
