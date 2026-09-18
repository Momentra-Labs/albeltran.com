import { SITE_URL } from "@/lib/constants";

type InquiryCopy = {
  name: string;
  email: string;
  message: string;
};

const PAPER = "#f4f1ea";
const INK = "#14141c";
const MUTED = "#5c5c6a";
const RULE = "#d8d2c6";
const NIGHT = "#050507";
const ACCENT = "#4f8eff";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function toEmailHtml(value: string) {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, "<br>");
}

export function formatInquiryReceived(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(date);
}

export function inquirySubject(name: string) {
  return `Inquiry · ${name} · albeltran.com`;
}

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "IN";
}

export function buildInquiryEmailHtml(
  values: InquiryCopy,
  receivedAt = new Date(),
  inbox = "al.andrew.p.beltran@gmail.com",
) {
  const name = escapeHtml(values.name);
  const email = escapeHtml(values.email);
  const message = toEmailHtml(values.message);
  const received = escapeHtml(formatInquiryReceived(receivedAt));
  const monogram = escapeHtml(initials(values.name));
  const replyHref = `mailto:${values.email}?subject=${encodeURIComponent("Re: your note to Al Beltran")}`;
  const preheader = escapeHtml(
    `New inquiry from ${values.name} — reply from Gmail to write them back.`,
  );

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <title>${escapeHtml(inquirySubject(next.name))}</title>
  </head>
  <body style="margin:0;padding:0;background:${NIGHT};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${preheader}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${NIGHT}" style="background:${NIGHT};margin:0;padding:0;">
      <tr>
        <td align="center" style="padding:28px 16px 36px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;">
            <tr>
              <td style="padding:0 8px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${ACCENT};">
                      Vol. 01 / Manila
                    </td>
                    <td align="right" style="font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#8b8b9c;">
                      Inquiry
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 8px 22px;">
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:0.95;color:#f0f0f5;">
                  AL BELTRAN
                </p>
                <p style="margin:8px 0 0;font-family:Consolas,'Courier New',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8b8b9c;">
                  Engineering folio · ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${PAPER}" style="background:${PAPER};border:1px solid #2a2a32;">
                  <tr>
                    <td style="padding:8px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${PAPER}" style="background:${PAPER};border:1px solid ${RULE};">
                        <tr>
                          <td style="padding:28px 28px 24px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td width="56" valign="top" style="width:56px;padding:0 16px 0 0;">
                                  <div style="width:48px;height:48px;background:${INK};color:${PAPER};font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:48px;text-align:center;">
                                    ${monogram}
                                  </div>
                                </td>
                                <td valign="middle">
                                  <p style="margin:0;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${ACCENT};">
                                    01 / Note
                                  </p>
                                  <p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.05;color:${INK};">
                                    ${name}
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;border-top:1px solid ${RULE};border-bottom:1px solid ${RULE};">
                              <tr>
                                <td width="50%" valign="top" style="width:50%;padding:14px 12px 14px 0;">
                                  <p style="margin:0;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
                                    From
                                  </p>
                                  <p style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.3;color:${INK};">
                                    ${name}
                                  </p>
                                </td>
                                <td width="50%" valign="top" style="width:50%;padding:14px 0 14px 12px;border-left:1px solid ${RULE};">
                                  <p style="margin:0;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
                                    Reply to
                                  </p>
                                  <p style="margin:6px 0 0;font-family:Consolas,'Courier New',monospace;font-size:13px;line-height:1.4;color:${INK};">
                                    <a href="mailto:${email}" style="color:${INK};text-decoration:none;">${email}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <p style="margin:22px 0 8px;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
                              Message
                            </p>
                            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.6;color:${INK};">
                              ${message}
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                              <tr>
                                <td bgcolor="${INK}" style="background:${INK};">
                                  <a href="${replyHref}" style="display:inline-block;padding:13px 22px;font-family:Consolas,'Courier New',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${PAPER};text-decoration:none;">
                                    Reply to ${name} →
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 8px 0;">
                <p style="margin:0;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#8b8b9c;">
                  Received ${received}
                </p>
                <p style="margin:8px 0 0;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.14em;color:#555566;">
                  Inbox ${escapeHtml(inbox)} ·
                  <a href="${SITE_URL}/contact/" style="color:${ACCENT};text-decoration:none;">albeltran.com/contact</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
