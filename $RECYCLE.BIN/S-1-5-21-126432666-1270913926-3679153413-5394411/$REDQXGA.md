# Journey to ISO 27001 - SISW SaaS ISMS Policy Searchable Page-ocr

- **1.3.6** Certificates from only the Siemens Server Registration Authority (ServerRA) AWS, QuoVadis, Digicert
or Let's Encrypt shall be used for Cloud Webservers accessible from the internet.
    - **1.3.7** Certificate providers following the Web Trust Principles and Criteria for Certification Authorities may
only be used temporarily with prior review and approval by DI SW Cybersecurity Officer
    - **1.3.8** In addition to key based security, the organization will also review strength of cipher suites
compatible with TLS endpoints, and will enable/disable on an as needed basis.

**1.4** All private communication tunnels (such as VPN) established between production network and remote
networks should leverage IPsec, or an industry standard equivalent.
    - **1.4.1** Individual IPsec tunnels should leverage independent pre-shared keys, and keys should not be reused.
    - **1.4.2** IPsec pre-shared keys should not be stored in plain text format. Password vaults should be leveraged,
with full audit trail functionality to capture access/modification activity at a user level.
  - **1.5** Generation of keys, tokens, passphrases shall follow the applicable vendor or service recommended best
practices, or shall conform to the requirements below absent any recommendations
    - **1.5.1** Each instance of key, token or certificate shall be generated using a unique input or seeding value;
where possible a random seeding key shall be applied using a random number/key generator application or
program
      - **1.5.1.1** Where applicable, the random seeding key shall be deleted irretrievably. Where a
recovery process is necessary and the seeding key should be preserved, a secured keystore or
vault shall be used for the purposes of storing the key and access controls applied, conforming to
the SISW Saas Access Control policy.
      - **1.5.1.2** The storage of seeding keys in unencrypted formats on endpoints is strictly prohibited,
and the storage of seeding keys as images of QR codes is also strictly prohibited.
    - **1.5.2** Where key strength, cipher and hashing techniques for the purposes of generation of private and
public keys is customizable, industry best practices and recommendations shall be followed.
    - **1.5.3** When generating keys, if an expiration attribute is customizable, the lifetime of such secrets/keys shall
follow the policies within table 1 of this document
  - **1.6** Storage of private keys, tokens and passphrases shall be secured, vaulted using access control mechanisms as
recommended within the SISW Saas Access Control Policy
    - **1.6.1** Where practicable, SISW owned and operated key vaults shall be leveraged for purposes of storing
secrets
    - **1.6.2** A secure vault or KMS shall be the primary storage mechanism for keys, tokens and passphrases, and
the storage of such keys on any endpoints, scripts, code or other human readable format is strictly prohibited.
      - **1.6.2.1** If necessary to host a secret/private key on an endpoint, applicable security mechanisms
from within this policy shall be enforced on such systems. For example, storage of private keys on
a server shall be possible only if the private key file is encrypted via a secret, and disk encryption
has been applied.
      - **1.6.2.2** Where necessary, a key encrypting key or wrapping key shall be applied for the
protection of highly critical secrets.
    - **1.6.3** Access to the storage location shall be moderated by SISW approved identity and access management
services, and a full audit trail shall be available to ensure both ad min and user actions on such secrets are
recorded.
    - **1.6.4** The copying of secrets out of vaults shall be technically restricted where possible. Logging and
monitoring for such efforts shall be applied in accordance with the SISW Saas Logging and Monitoring policy
    - **1.6.5** Access reviews of the key storage vaults shall be performed regularly, in accordance with the SISW
Saas Access Control Policy.
  - **1.7** Where possible, the use of static certificates, keys, tokens and passphrases as authentication/authorization
credentials should be a secondary mechanism, and not deployed as the primary identification factor
  - **1.8** Static Keys, token, passphrases shall be securely disposed at the conclusion of the use case or end of life, and
shall not be reused
    - **1.8.1** Keys, tokens and passphrases stored in key vaults shall be deleted/removed using applicable vault
mechanisms.
    - **1.8.2** Key attributes and seeding keys used to generate secrets shall also be disposed when the key/secret is
disposed.

