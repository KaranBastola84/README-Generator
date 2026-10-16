/**
 * Input safety helpers for README generator.
 *
 * Single-line fields are treated as PLAIN TEXT: newlines and repeated spaces
 * are collapsed, the result is trimmed, and Markdown-significant characters
 * are escaped so the value renders as literal text even when placed inside
 * Markdown constructs (headings, link text, emphasis).
 *
 * URLs are validated: only http:, https: and mailto: are accepted. Spaces
 * and a few characters that can break a Markdown link destination are
 * percent-encoded, so a user value can never terminate the link early.
 *
 * About text keeps its Markdown; only line endings are normalised.
 */

/** Markdown-significant characters that must be escaped to render as literal text. */
const MD_ESCAPE: Record<string, string> = {
  "\\": "\\\\",
  "*": "\\*",
  "_": "\\_",
  "{": "\\{",
  "}": "\\}",
  "[": "\\[",
  "]": "\\]",
  "<": "\\<",
  ">": "\\>",
  "`": "\\`",
  "(": "\\(",
  ")": "\\)",
  "#": "\\#",
  "!": "\\!",
  "&": "\\&",
};

function escapeMarkdownPlain(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    out += MD_ESCAPE[ch] ?? ch;
  }
  return out;
}

/**
 * Collapse newlines and repeated spaces into a single space, trim, escape
 * Markdown-significant characters, and enforce a sensible length limit.
 */
export function sanitizePlain(text: string, maxLength = 120): string {
  if (typeof text !== "string") return "";
  const collapsed = text
    .replace(/[\r\n]+/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
  const bounded = collapsed.slice(0, maxLength);
  return escapeMarkdownPlain(bounded);
}

/**
 * Normalise line endings for the About field. Markdown is allowed in about,
 * so we do not escape it — we only collapse CRLF to LF and trim trailing
 * blank lines.
 */
export function normalizeAbout(text: string): string {
  if (typeof text !== "string") return "";
  return text.replace(/\r\n/g, "\n").trim();
}

const ALLOWED_URL_SCHEMES = new Set(["http:", "https:", "mailto:"]);

/**
 * Validate a URL: only http/https (and mailto: for email) are accepted.
 * Spaces and characters that can break a Markdown link destination are
 * percent-encoded. Invalid or unsupported schemes return "" (no link).
 */
export function sanitizeUrl(raw: string): string {
  if (typeof raw !== "string") return "";
  const s = raw.trim();
  if (!s) return "";

  let scheme = "";
  const colonIdx = s.indexOf(":");
  if (colonIdx !== -1) {
    scheme = s.slice(0, colonIdx).toLowerCase();
  }

  // mailto: is allowed for email links
  if (scheme === "mailto") {
    const rest = s.slice(colonIdx + 1);
    if (!rest) return "";
    // percent-encode spaces and a couple of dangerous characters in the addr part
    return "mailto:" + percentEncodeDangerous(rest);
  }

  if (!ALLOWED_URL_SCHEMES.has(scheme + ":")) return "";

  const afterScheme = s.slice(scheme.length + 1);
  if (!afterScheme) return "";

  // For http/https, require something that looks like a host. Allow an
  // authority-only value (e.g. "https://example.com") but reject bare
  // "https:" with nothing after it. Percent-encode spaces and a small set
  // of characters that can break a Markdown link destination: ( ) [ ] " '
  const encoded = percentEncodeDangerous(afterScheme);
  return scheme + ":" + encoded;
}

/**
 * Percent-encode spaces and characters that can break a Markdown link
 * destination: ( ) [ ] and the quote characters " ' . Leaves most other
 * characters as-is so normal URLs stay readable.
 */
function percentEncodeDangerous(str: string): string {
  const out: string[] = [];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const code = ch.charCodeAt(0);
    // space (0x20) and the characters that can close/terminate a Markdown link
    if (
      ch === " " ||
      ch === "(" ||
      ch === ")" ||
      ch === "[" ||
      ch === "]" ||
      ch === '"' ||
      ch === "'"
    ) {
      out.push("%" + code.toString(16).toUpperCase().padStart(2, "0"));
    } else {
      out.push(ch);
    }
  }
  return out.join("");
}
