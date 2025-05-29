const isPhishing = require('is-phishing');

exports.scanEmailOrUrl = async (type, content) => {
  if (type === 'website') {
    const isPhishy = isPhishing(content);
    return {
      status: isPhishy ? 'malicious' : 'safe',
      message: isPhishy
        ? 'The URL appears to be phishing.'
        : 'The URL is considered safe based on the scan.',
    };
  }

  if (type === 'email') {
    const lower = content.toLowerCase();
    if (
      lower.includes('verify your account') ||
      lower.includes('click this link') ||
      lower.includes('urgent action') ||
      lower.includes('reset your password') ||
      lower.match(/http[s]?:\/\/[^ ]+/g)
    ) {
      return {
        status: 'suspicious',
        message: 'This email contains common phishing patterns.',
      };
    }

    return {
      status: 'safe',
      message: 'No suspicious content detected.',
    };
  }

  return {
    status: 'unknown',
    message: 'Unable to scan content',
  };
};
