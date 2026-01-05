export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy – AyAySee AAC</h1>
      <p>Effective date: January 5, 2026</p>

      <p>
        AyAySee AAC ("the App") is designed to give users a reliable communication voice using text, symbols, and optional speech synthesis. Your privacy is central to our design.
      </p>

      <h2>1. Data We Collect</h2>
      <p>
        AyAySee AAC does not automatically collect personal data. All vocabulary, phrases, symbols, and settings are stored locally on your device only.
      </p>
      <p>The App may store the following locally if you choose to use it:</p>
      <ul>
        <li>Custom words, phrases, abbreviations</li>
        <li>Uploaded photos or symbols you assign to buttons</li>
        <li>Usage frequency of phrases (for better suggestions)</li>
        <li>Admin PIN (stored in hashed/encrypted form locally)</li>
      </ul>

      <h2>2. Data Not Collected</h2>
      <p>We do not collect, track, or store:</p>
      <ul>
        <li>Conversation history</li>
        <li>Voice recordings</li>
        <li>Location data</li>
        <li>Device identifiers</li>
        <li>Analytics or tracking data</li>
        <li>Behavioral or interest profiles</li>
        <li>Any data used to identify you</li>
      </ul>

      <h2>3. Optional Voice Services (User-Initiated Only)</h2>
      <p>
        If you enter your own API key to use third-party voice services (e.g., ElevenLabs), text you choose to speak may be sent to that provider only at the moment you press "Speak".
        AyAySee AAC does not store or transmit your API key outside your device. Keys are kept in secure storage on the device.
      </p>

      <h2>4. Local Backups (User-Initiated Only)</h2>
      <p>
        You may export or back up your vocabulary manually. This is always initiated by you. We never upload backups without your action.
      </p>

      <h2>5. Data Security</h2>
      <p>Because data lives on your device:</p>
      <ul>
        <li>Button positions remain stable (motor-planning safe)</li>
        <li>Vocabulary can be hidden (masked), never auto-deleted</li>
        <li>Admin PIN access is required to modify vocabulary</li>
        <li>API keys, if entered, are stored using platform secure storage</li>
      </ul>

      <h2>6. Children's Privacy</h2>
      <p>
        AyAySee AAC can be used by children, but the App itself does not collect data about age, identity, or behavior. Vocabulary is managed by caregivers using a local admin PIN.
      </p>

      <h2>7. Third-Party Libraries</h2>
      <p>
        The App uses open-source libraries for performance and offline storage. These libraries run on the device and do not transmit personal data.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        Since no personal data is stored by us, there is nothing to request, delete, or withdraw from our servers. All your data stays in your control on your device.
      </p>

      <h2>9. Policy Updates</h2>
      <p>
        If this policy changes, the update will be posted inside the App and on our GitHub Pages site. The effective date will be updated at the top.
      </p>

      <h2>10. Contact</h2>
      <p>For questions about privacy, you can reach us at:</p>
      <p>
        <a href="mailto:hello@ayaysee.app">hello@ayaysee.app</a> (or your support email)
      </p>
    </>
  );
}
