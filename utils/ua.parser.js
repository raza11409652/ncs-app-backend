const useragent = require("useragent");
const { isValidDomain } = require("./domain");
const getOsInfo = (userAgent) => {
  var OSName = "Unknown OS";
  if (userAgent.indexOf("Win") != -1) OSName = "Windows";
  if (userAgent.indexOf("Mac") != -1) OSName = "Macintosh";
  if (userAgent.indexOf("Linux") != -1) OSName = "Linux";
  if (userAgent.indexOf("Android") != -1) OSName = "Android";
  if (userAgent.indexOf("like Mac") != -1) OSName = "iOS";
  return { name: OSName.toLowerCase() };
};
const browserInfo = (userAgent) => {
  const parsed = useragent.parse(userAgent);
  return { name: parsed.family, version: parsed.major };
};
const isMobileDevice = (userAgent) => {
  if (!userAgent) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};

const getReferSource = (headers) => {
  if (headers?.["user-agent"]?.includes("facebook")) {
    return "facebook";
  } else if (
    headers?.["x-requested-with"] === "com.instagram.android" ||
    headers?.["x-requested-with"]?.includes("instagram")
  ) {
    return "instagram";
  } else if (
    headers?.["referer"] === "android-app://com.google.android.gm/" ||
    headers?.["referer"]?.includes("com.google.android.gm") ||
    headers?.["referer"]?.includes("gmail")
  ) {
    return "gmail";
  } else if (
    headers?.["referer"] === "android-app://com.google.android.youtube/" ||
    headers?.["referer"]?.includes("com.google.android.youtube") ||
    headers?.["referer"]?.includes("youtube")
  ) {
    return "youtube";
  } else if (
    headers?.["referer"] === "android-app://com.linkedin.android/" ||
    headers?.["referer"]?.includes("com.linkedin.android") ||
    headers?.["referer"]?.includes("linkedin")
  ) {
    return "linkedin";
  } else if (isValidDomain(headers?.["referer"])) {
    return headers?.["referer"];
  }

  return "NA";
};
exports.parseHeaderUserAgent = (headers) => {
  if (typeof headers !== "object") return null;
  try {
    const userAgents = headers["user-agent"];
    const operatingSystemInfo = getOsInfo(userAgents);
    // console.log({ userAgents });
    const browser = browserInfo(userAgents);
    const isMobile = isMobileDevice(userAgents);
    const source = getReferSource(headers);
    const option = {
      browser: { ...browser },
      os: { ...operatingSystemInfo },
      isMobile,
      source,
    };
    return option;
  } catch (e) {
    return null;
  }
};
