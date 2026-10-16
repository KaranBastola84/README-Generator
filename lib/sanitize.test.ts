import { describe, it, expect } from "vitest";
import { sanitizePlain, sanitizeUrl, normalizeAbout } from "./sanitize";

describe("sanitize (isolated)", () => {
  it("escapes Markdown-significant characters in a label", () => {
    // Input: ]**(http://x) (bracket, asterisk, asterisk, paren, http://x, paren)
    // Each Markdown-significant char is prefixed with a backslash, same order.
    const input = "]**(http://x)";
    const result = sanitizePlain(input);
    // Each special char is escaped (backslash + char); non-special chars unchanged.
    expect(result).toContain("\\]");
    expect(result).toContain("\\*");
    expect(result).toContain("\\(");
    expect(result).toContain("http://x");
    // Two asterisks -> two backslash-asterisk sequences; one bracket -> one backslash-bracket.
    expect(result.split("\\*").length).toBe(3);
    expect(result.split("\\]").length).toBe(2);
    expect(result.split("\\(").length).toBe(2);
  });

  it("URL percent-encodes spaces and parens, rejects non-whitelisted schemes", () => {
    expect(sanitizeUrl("https://example.com/a)b")).toBe("https://example.com/a%29b");
    expect(sanitizeUrl("https://example.com/a b")).toBe("https://example.com/a%20b");
    expect(sanitizeUrl("javascript:alert(1)")).toBe("");
    expect(sanitizeUrl("data:text/html,<h1>x</h1>")).toBe("");
    expect(sanitizeUrl("ftp://example.com")).toBe("");
  });

  it("accepts mailto: and a URL with a quote in the path", () => {
    expect(sanitizeUrl("mailto:hi@example.com")).toBe("mailto:hi@example.com");
    // quote is percent-encoded; < and > are not in the encode set
    expect(sanitizeUrl('https://example.com/"><x')).toContain("%22");
    expect(sanitizeUrl('https://example.com/"><x')).toContain("<");
    expect(sanitizeUrl('https://example.com/"><x')).toContain(">");
  });

  it("normalises About line endings, keeps Markdown", () => {
    expect(normalizeAbout("Line one\r\nLine two\r\n")).toBe("Line one\nLine two");
  });
});
