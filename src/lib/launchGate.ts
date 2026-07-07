export function shouldShowLaunchSoon(host: string | null) {
  const normalizedHost = (host || "").split(":")[0].toLowerCase();

  return normalizedHost === "vihanafoundation.org" || normalizedHost === "www.vihanafoundation.org";
}
