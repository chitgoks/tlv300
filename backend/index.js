const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const WHOIS_API_KEY = process.env.WHOIS_API_KEY;
const WHOIS_ENDPOINT = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';

app.post('/api/whois', async (req, res) => {
  const { domain, type } = req.body;
  if (!domain) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  try {
    const response = await axios.get(WHOIS_ENDPOINT, {
      params: {
        apiKey: WHOIS_API_KEY,
        domainName: domain,
        outputFormat: 'JSON'
      }
    });

    const record = response.data.WhoisRecord || {};
    const registry = record.registryData || {};

    if (type === 'contact') {
      return res.json({
        registrantName: record.registrant?.name || null,
        technicalContactName: record.technicalContact?.name || null,
        administrativeContactName: record.administrativeContact?.name || null,
        contactEmail: record.technicalContact?.email || null
      });
    } else {
      const hostnames = registry.nameServers?.hostNames || [];
      let hostnamesStr = hostnames.join(', ');
      // Truncate until maximum of 25 characters.
      if (hostnamesStr.length > 25) {
        hostnamesStr = hostnamesStr.substring(0, 25) + '...';
      }     

      let estimatedDomainAge = null;
      if (registry.createdDate) {
        const created = new Date(registry.createdDate);
        const now = new Date();

        let endDate = now;
        if (registry.expiresDate) {
          const expires = new Date(registry.expiresDate);
          if (expires > created && expires < now) {
            endDate = expires;
          }
        }
        const diffMs = endDate - created;
        const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
        estimatedDomainAge = Math.floor(diffYears);
      }
      estimatedDomainAge = estimatedDomainAge !== null ? estimatedDomainAge + ' years' : null;
      return res.json({
        domainName: domain,
        registrarName: record.registrarName || null,
        registrationDate: registry.createdDate || null,
        expirationDate: registry.expiresDate || null,
        estimatedDomainAge: estimatedDomainAge,
        hostnames: hostnamesStr
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(502).json({ error: 'Failed to fetch Whois info.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
