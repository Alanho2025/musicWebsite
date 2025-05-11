<script>
  // 若未來要加入動態內容可在此撰寫
</script>
<svelte:head>
    <title>About</title>
</svelte:head>


<style>
  .about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    line-height: 1.6;
    color: #222;
  }

  h1, h2 {
    color: #111;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 3.25rem;
  }

  h2 {
    font-size: 2.5rem;
    margin-top: 2rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;

  }

  blockquote {
    font-style: italic;
    color: #666;
    margin: 1rem 0;
    padding-left: 1rem;
    border-left: 3px solid #ccc;
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
  }

  .cta-links {
    margin-top: 2rem;
  }

  .cta-links a {
    display: inline-block;
    margin-right: 1rem;
    text-decoration: none;
    color: #0055ff;
    font-weight: bold;
  }

  .section {
    margin-bottom: 3rem;
  }
</style>

<div class="about-page">
  <h1>🎧 About Us</h1>
  <p><strong>Let’s make music more than background noise.</strong></p>
  <p>
    Luminaria is where discovery meets emotion. Whether you're vibing out, hunting for rare finds, 
    or supporting your favorite artists—this is your new musical playground.
  </p>

  <div class="section">
    <h2>🌠 What You Can Do Here</h2>

    <h3>🔊 Instant Play</h3>
    <p>Jump right into the sound. No login, no fuss—just hit play and get lost in the music.</p>
    <blockquote>"One click, instant vibe."</blockquote>

    <h3>🌌 Explore Albums</h3>
    <p>Our curated library is designed to lead you down a rabbit hole of sonic gems.</p>
    <blockquote>"Discover music you didn’t know you loved."</blockquote>

    <h3>🛒 Buy What You Love</h3>
    <p>See something that hits different? Grab the album—digital or physical—and make it yours.</p>
    <blockquote>"Support the music. Own the moment."</blockquote>
  </div>

  <div class="section">
    <h2>💡 Our Mission</h2>
    <p>
      We believe music is <strong>more than content</strong>. It’s memory, identity, soul.
      That’s why Luminaria focuses on <strong>authentic listening</strong>—connecting people to sound, not just noise.
    </p>
  </div>

  <div class="section">
    <h2>🔎 Why We Built This</h2>
    <p>
      We were tired of recommendation engines that felt robotic. So we built a space where you can actually 
      explore, feel, and <strong>own</strong> your musical journey.
      Luminaria is for <strong>listeners, not algorithms</strong>.
    </p>
  </div>

  <div class="section">
    <h2>✨ Core Values</h2>
    <ul>
      <li><strong>Curation > Saturation</strong>: Every track is handpicked. No endless scrolls or filler.</li>
      <li><strong>Deep Listening</strong>: Go beyond the beat. Explore the story behind each album.</li>
      <li><strong>Creator-First</strong>: Artists earn directly. No middlemen.</li>
    </ul>
  </div>

  <div class="section">
    <h2>👋 Meet the Creator</h2>
    <p>
      Hi, I’m Alan, the mind behind Luminaria.<br />
      I built this because I believe music should move you—not just fill the silence.
      What started as a coding experiment turned into my passion project.
      Hope you enjoy the journey.
    </p>
  </div>

  <div class="section">
    <h2>🛠️ Tech We’re Proud Of</h2>
    <ul>
      <li>Built with <strong>SvelteKit</strong> for blazing-fast interactions.</li>
      <li>Custom audio player + album filtering.</li>
      <li>Responsive design, smooth UX.</li>
    </ul>
  </div>

  <div class="cta-links">
    <a href="/AlbumList">👉 Explore Albums</a>
    <a href="/MusicPlayer">🎶 Start Listening</a>
  </div>
</div>